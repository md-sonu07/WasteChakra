from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, generics
from django.db.models import Count

from apps.detection.models import WasteImage
from apps.detection.ml.virtual_classifier import virtual_classify
from apps.analysis.models import SimulatedReading
from apps.analysis.services import generate_virtual_features, manual_features
from apps.decision_engine.engine import decide_category

from .models import WasteRecord
from .serializers import WasteRecordSerializer
from .filters import WasteRecordFilter


class ProcessWasteImageView(APIView):
    """One-shot combined pipeline for image processing.
    Uploads waste image -> classifies material -> generates software readings -> decides category -> logs record.
    """
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        if "image" not in request.FILES:
            return Response({"error": "Image file is required under 'image' key"}, status=status.HTTP_400_BAD_REQUEST)

        image_file = request.FILES["image"]
        source = request.data.get("source", "UPLOAD")

        # 1. Save uploaded waste image
        waste_image = WasteImage.objects.create(image=image_file, source=source)

        # 2. Classify material
        material, confidence, all_probs = virtual_classify(waste_image.image.path)
        waste_image.detected_material = material
        waste_image.detection_confidence = confidence
        waste_image.raw_model_output = all_probs
        waste_image.save()

        # 3. Generate software virtual feature readings
        features = generate_virtual_features(material, confidence)

        reading = SimulatedReading.objects.create(
            image=waste_image,
            moisture_pct=features["moisture_pct"],
            combustibility_index=features["combustibility_index"],
            recyclability_score=features["recyclability_score"],
            rdf_suitability_score=features["rdf_suitability_score"],
            contamination_pct=features["contamination_pct"],
            is_manual_override=False,
        )

        # 4. Determine final destination category
        category, trace, decision_confidence = decide_category(features, mode="hybrid")

        # 5. Persist complete pipeline record
        record = WasteRecord.objects.create(
            image=waste_image,
            simulated_reading=reading,
            final_category=category,
            decision_confidence=decision_confidence,
            decision_breakdown=trace,
        )

        return Response(WasteRecordSerializer(record, context={"request": request}).data, status=status.HTTP_201_CREATED)


class ProcessWasteSimulateView(APIView):
    """One-shot combined pipeline for manual parameter simulation (React Sliders).
    Manual slider values -> validates features -> decides category -> logs record.
    """
    def post(self, request):
        features = manual_features(request.data)

        reading = SimulatedReading.objects.create(
            moisture_pct=features["moisture_pct"],
            combustibility_index=features["combustibility_index"],
            recyclability_score=features["recyclability_score"],
            rdf_suitability_score=features["rdf_suitability_score"],
            contamination_pct=features["contamination_pct"],
            is_manual_override=True,
        )

        category, trace, decision_confidence = decide_category(features, mode="hybrid")

        record = WasteRecord.objects.create(
            simulated_reading=reading,
            final_category=category,
            decision_confidence=decision_confidence,
            decision_breakdown=trace,
        )

        return Response(WasteRecordSerializer(record, context={"request": request}).data, status=status.HTTP_201_CREATED)


class WasteRecordListView(generics.ListAPIView):
    """Paginated and filterable list of historical waste processing records."""
    queryset = WasteRecord.objects.all().select_related("image", "simulated_reading")
    serializer_class = WasteRecordSerializer
    filterset_class = WasteRecordFilter


class WasteRecordDetailView(generics.RetrieveAPIView):
    """Single waste processing record detail view."""
    queryset = WasteRecord.objects.all().select_related("image", "simulated_reading")
    serializer_class = WasteRecordSerializer
    lookup_field = "id"


class StatsSummaryView(APIView):
    """Dashboard analytics: total count, category breakdown, diversion rate."""
    def get(self, request):
        qs = WasteRecord.objects.values("final_category").annotate(count=Count("id"))
        counts = {item["final_category"]: item["count"] for item in qs}

        # Ensure all category keys exist in response
        all_categories = ["RECYCLE", "BIO", "RDF", "REJECT"]
        by_category = {cat: counts.get(cat, 0) for cat in all_categories}

        total = sum(by_category.values())
        diverted = sum(count for cat, count in by_category.items() if cat != "REJECT")
        diversion_rate = round(100.0 * diverted / max(total, 1), 2)

        percentages = {
            cat: round(100.0 * count / max(total, 1), 1)
            for cat, count in by_category.items()
        }

        return Response({
            "total_processed": total,
            "by_category": by_category,
            "by_category_pct": percentages,
            "diversion_rate_pct": diversion_rate,
        })
