import uuid
from django.db import models


class MaterialType(models.TextChoices):
    PLASTIC = "PLASTIC", "Plastic"
    PAPER = "PAPER", "Paper / Cardboard"
    METAL = "METAL", "Metal"
    GLASS = "GLASS", "Glass"
    ORGANIC = "ORGANIC", "Organic / Food Waste"
    TEXTILE = "TEXTILE", "Textile / Cloth"
    E_WASTE = "E_WASTE", "Electronic Waste"
    MIXED = "MIXED", "Mixed / Unidentified"


class WasteImage(models.Model):
    """User-uploaded waste image (via file input or browser webcam snapshot).
    Fully software-based file upload — no physical edge camera involved."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to="waste_images/%Y/%m/%d/", null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    source = models.CharField(
        max_length=20,
        choices=[
            ("UPLOAD", "File Upload"),
            ("WEBCAM", "Browser Webcam Snapshot"),
            ("SIMULATED", "Manual Simulation, No Image"),
        ],
        default="UPLOAD",
    )
    detected_material = models.CharField(
        max_length=20,
        choices=MaterialType.choices,
        default=MaterialType.MIXED,
    )
    detection_confidence = models.FloatField(default=0.0)
    raw_model_output = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.detected_material} ({self.detection_confidence * 100:.1f}%) - {self.id}"
