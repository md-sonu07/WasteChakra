import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.TextChoices):
    CITIZEN = "CITIZEN", "Citizen"
    BUSINESS = "BUSINESS", "Business"
    SOCIETY_ADMIN = "SOCIETY_ADMIN", "Society Admin"
    COLLECTOR = "COLLECTOR", "Collector"
    FACILITY_MANAGER = "FACILITY_MANAGER", "Facility Manager"
    ADMIN = "ADMIN", "Admin"
    SUPER_ADMIN = "SUPER_ADMIN", "Super Admin"


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.CITIZEN)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return f"{self.email} ({self.role})"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True, default='')
    address = models.TextField(blank=True, default='')
    address_line1 = models.CharField(max_length=255, blank=True, default='')
    address_line2 = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    pincode = models.CharField(max_length=20, blank=True, default='')
    vehicle_number = models.CharField(max_length=50, blank=True, default='')
    vehicle_type = models.CharField(max_length=20, blank=True, default='VAN')
    avatar = models.ImageField(upload_to='avatars/%Y/%m/', null=True, blank=True)
    chakra_points = models.PositiveIntegerField(default=0)
    total_waste_submitted_kg = models.FloatField(default=0.0)
    total_waste_recovered_kg = models.FloatField(default=0.0)
    streak_days = models.PositiveIntegerField(default=0)
    last_activity_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile: {self.user.email}"


class CollectorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='collector_profile')
    phone = models.CharField(max_length=20, blank=True, default='')
    address_line1 = models.CharField(max_length=255, blank=True, default='')
    address_line2 = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    pincode = models.CharField(max_length=20, blank=True, default='')
    vehicle_number = models.CharField(max_length=20, blank=True, default='')
    vehicle_type = models.CharField(
        max_length=20,
        choices=[
            ('BIKE', 'Bike'),
            ('VAN', 'Van'),
            ('TRUCK', 'Truck'),
            ('AUTO', 'Auto Rickshaw'),
        ],
        default='VAN',
    )
    current_lat = models.FloatField(null=True, blank=True)
    current_lng = models.FloatField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    rating = models.FloatField(default=5.0)
    total_pickups = models.PositiveIntegerField(default=0)
    total_distance_km = models.FloatField(default=0.0)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.user_id:
            profile, _ = UserProfile.objects.get_or_create(user=self.user)
            updated = False
            for field in ['phone', 'address_line1', 'address_line2', 'city', 'state', 'pincode', 'vehicle_number', 'vehicle_type']:
                val = getattr(self, field, '')
                if val and getattr(profile, field, '') != val:
                    setattr(profile, field, val)
                    updated = True
            if updated:
                parts = [p for p in [profile.address_line1, profile.address_line2, profile.city, profile.state, profile.pincode] if p]
                if parts:
                    profile.address = ", ".join(parts)
                profile.save()

    def __str__(self):
        return f"Collector: {self.user.email} ({self.vehicle_number})"
