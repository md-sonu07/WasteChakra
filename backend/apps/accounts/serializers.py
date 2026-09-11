from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile, CollectorProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'role', 'profile', 'date_joined']
        read_only_fields = ['id', 'role', 'date_joined']

    def get_profile(self, obj):
        try:
            p = obj.profile
            return UserProfileSerializer(p).data
        except UserProfile.DoesNotExist:
            return None


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    ALLOWED_ROLES = ['CITIZEN', 'COLLECTOR', 'BUSINESS', 'FACILITY_MANAGER']

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password_confirm', 'first_name', 'last_name', 'role']

    def validate_role(self, value):
        if value and value not in self.ALLOWED_ROLES:
            raise serializers.ValidationError(
                f"Invalid role. Allowed: {', '.join(self.ALLOWED_ROLES)}"
            )
        return value or 'CITIZEN'

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        # Auto-create CollectorProfile if role is COLLECTOR
        if user.role == 'COLLECTOR':
            CollectorProfile.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'phone', 'address', 'city', 'chakra_points',
            'total_waste_submitted_kg', 'total_waste_recovered_kg',
            'streak_days', 'last_activity_date',
        ]


class CollectorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectorProfile
        fields = [
            'vehicle_number', 'vehicle_type', 'current_lat', 'current_lng',
            'is_active', 'rating', 'total_pickups', 'total_distance_km',
        ]


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
