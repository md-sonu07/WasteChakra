from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import UserProfile, CollectorProfile

User = get_user_model()


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'username', 'role', 'is_active', 'date_joined']
    list_filter = ['role', 'is_active']
    search_fields = ['email', 'username']
    ordering = ['-date_joined']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('WasteChakra', {'fields': ('role',)}),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'city', 'chakra_points']
    search_fields = ['user__email']


@admin.register(CollectorProfile)
class CollectorProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'city', 'vehicle_number', 'vehicle_type', 'is_active', 'rating', 'total_pickups']
    list_filter = ['is_active', 'vehicle_type', 'city', 'state']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'phone', 'vehicle_number', 'city', 'pincode']
    fieldsets = (
        ('Collector Account', {'fields': ('user', 'is_active', 'rating', 'total_pickups', 'total_distance_km')}),
        ('Vehicle Details', {'fields': ('vehicle_number', 'vehicle_type')}),
        ('Contact & Address Information', {'fields': ('phone', 'address_line1', 'address_line2', 'city', 'state', 'pincode')}),
        ('Location Hub Coordinates', {'fields': ('current_lat', 'current_lng')}),
    )
