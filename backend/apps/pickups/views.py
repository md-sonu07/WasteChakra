import uuid
from datetime import datetime
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Sum
from .models import WasteReport, Pickup, WastePassport
from .serializers import (
    WasteReportSerializer, WasteReportCreateSerializer,
    PickupSerializer, PickupCreateSerializer, PickupStatusUpdateSerializer,
    WastePassportSerializer,
)


def generate_report_id():
    return f"WC-{datetime.now().strftime('%Y')}-{str(uuid.uuid4())[:6].upper()}"


def generate_pickup_id():
    return f"WC-{datetime.now().strftime('%Y')}-{str(uuid.uuid4())[:6].upper()}"


def generate_passport_id():
    return f"WP-{datetime.now().strftime('%Y')}-{str(uuid.uuid4())[:6].upper()}"


class WasteReportCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WasteReportCreateSerializer

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            report_id=generate_report_id(),
        )


class WasteReportListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WasteReportSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ('ADMIN', 'SUPER_ADMIN'):
            return WasteReport.objects.all()
        return WasteReport.objects.filter(user=user)


class WasteReportDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WasteReportSerializer
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        if user.role in ('ADMIN', 'SUPER_ADMIN'):
            return WasteReport.objects.all()
        return WasteReport.objects.filter(user=user)


class PickupCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PickupCreateSerializer

    def perform_create(self, serializer):
        pickup = serializer.save(
            user=self.request.user,
            pickup_id=generate_pickup_id(),
        )
        if pickup.waste_report:
            pickup.waste_report.status = 'PICKUP_SCHEDULED'
            pickup.waste_report.save()


class PickupListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PickupSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ('COLLECTOR',):
            return Pickup.objects.filter(collector=user)
        if user.role in ('ADMIN', 'SUPER_ADMIN', 'FACILITY_MANAGER'):
            return Pickup.objects.all()
        return Pickup.objects.filter(user=user)


class PickupDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ('PATCH', 'PUT'):
            return PickupStatusUpdateSerializer
        return PickupSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ('ADMIN', 'SUPER_ADMIN', 'COLLECTOR'):
            return Pickup.objects.all()
        return Pickup.objects.filter(user=user)

    def update(self, request, *args, **kwargs):
        pickup = self.get_object()
        user = request.user
        is_admin = user.role in ('ADMIN', 'SUPER_ADMIN', 'FACILITY_MANAGER')
        is_owner = pickup.user_id == user.id
        is_collector = pickup.collector_id == user.id

        if user.role == 'COLLECTOR' and not is_collector:
            return Response({'error': 'You are not assigned to this pickup'}, status=status.HTTP_403_FORBIDDEN)

        if not (is_admin or is_owner or is_collector):
            return Response({'error': 'You do not have permission to update this pickup'}, status=status.HTTP_403_FORBIDDEN)

        # Status state machine validation
        VALID_TRANSITIONS = {
            'REQUESTED': ['CONFIRMED', 'ASSIGNED', 'CANCELLED'],
            'CONFIRMED': ['ASSIGNED', 'CANCELLED'],
            'ASSIGNED': ['EN_ROUTE', 'CANCELLED'],
            'EN_ROUTE': ['ARRIVED'],
            'ARRIVED': ['COLLECTED'],
            'COLLECTED': ['PROCESSING'],
            'PROCESSING': ['COMPLETED'],
        }
        new_status = request.data.get('status')
        if new_status and new_status != pickup.status:
            allowed = VALID_TRANSITIONS.get(pickup.status, [])
            if new_status not in allowed:
                return Response(
                    {'error': f"Invalid status transition: {pickup.status} → {new_status}. Allowed: {allowed or 'none'}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return super().update(request, *args, **kwargs)


class WastePassportView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WastePassportSerializer
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        if user.role in ('ADMIN', 'SUPER_ADMIN', 'FACILITY_MANAGER'):
            return WastePassport.objects.all()
        return WastePassport.objects.filter(pickup__user=user)


class UserImpactView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        pickups = Pickup.objects.filter(user=user, status='COMPLETED')
        stats = pickups.aggregate(
            total_pickups=Count('id'),
            total_weight=Sum('actual_weight_kg'),
        )
        try:
            profile = user.profile
            chakra_points = profile.chakra_points
            streak = profile.streak_days
        except Exception:
            chakra_points = 0
            streak = 0

        return Response({
            'total_pickups': stats['total_pickups'] or 0,
            'total_weight_kg': stats['total_weight'] or 0,
            'chakra_points': chakra_points,
            'streak_days': streak,
            'waste_submitted_kg': user.profile.total_waste_submitted_kg if hasattr(user, 'profile') else 0,
            'waste_recovered_kg': user.profile.total_waste_recovered_kg if hasattr(user, 'profile') else 0,
        })
