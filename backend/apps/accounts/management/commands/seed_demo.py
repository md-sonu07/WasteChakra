import uuid
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.accounts.models import UserProfile, CollectorProfile
from apps.pickups.models import WasteReport, Pickup, WastePassport

User = get_user_model()


class Command(BaseCommand):
    help = "Seed demo data for WasteChakra"

    def handle(self, *args, **options):
        email = "admin@wastechakra.com"
        if not User.objects.filter(email=email).exists():
            user = User.objects.create_superuser(
                email=email,
                username="admin",
                password="admin12345",
                role="SUPER_ADMIN",
                first_name="Admin",
                last_name="WasteChakra",
            )
            UserProfile.objects.create(user=user, phone="+910000000000", city="Metro")
            self.stdout.write("Created super admin")

        demo_citizen = self._get_or_create_user(
            "citizen@wastechakra.com", "citizen", "Citizen", "Demo", "CITIZEN"
        )
        demo_collector = self._get_or_create_user(
            "collector@wastechakra.com", "collector", "Ravi", "Kumar", "COLLECTOR"
        )
        demo_business = self._get_or_create_user(
            "business@wastechakra.com", "business", "Business", "Demo", "BUSINESS"
        )
        demo_facility = self._get_or_create_user(
            "facility@wastechakra.com", "facility", "Facility", "Manager", "FACILITY_MANAGER"
        )

        collector_profile, _ = CollectorProfile.objects.get_or_create(user=demo_collector)
        collector_profile.vehicle_type = "VAN"
        collector_profile.vehicle_number = "WB-24-XX-1234"
        collector_profile.is_active = True
        collector_profile.save()

        citizen_profile, _ = UserProfile.objects.get_or_create(user=demo_citizen)
        citizen_profile.chakra_points = 1280
        citizen_profile.total_waste_submitted_kg = 127
        citizen_profile.total_waste_recovered_kg = 104
        citizen_profile.streak_days = 7
        citizen_profile.phone = "+919999999999"
        citizen_profile.city = "Metro"
        citizen_profile.save()

        if not WasteReport.objects.exists():
            reports = [
                {
                    "report_id": "WC-1048", "user": demo_citizen,
                    "waste_type": "MIXED", "urgency": "HIGH",
                    "estimated_quantity": "20-50", "status": "REPORTED",
                    "latitude": 12.9716, "longitude": 77.5946,
                    "address": "123 Green Street, Eco District",
                    "description": "Mixed household waste pile near entrance",
                },
                {
                    "report_id": "WC-1049", "user": demo_citizen,
                    "waste_type": "PLASTIC", "urgency": "NORMAL",
                    "estimated_quantity": "5-20", "status": "PICKUP_SCHEDULED",
                    "latitude": 12.9720, "longitude": 77.5960,
                    "address": "456 Green Street, Eco District",
                    "description": "Plastic bottles collected from community drive",
                },
                {
                    "report_id": "WC-1050", "user": demo_business,
                    "waste_type": "E_WASTE", "urgency": "URGENT",
                    "estimated_quantity": "50-100", "status": "PICKUP_SCHEDULED",
                    "latitude": 12.9750, "longitude": 77.6000,
                    "address": "Tech Park Building 4, Hardware Loop",
                    "description": "Retired computers and batteries for certified recycling",
                },
            ]
            for data in reports:
                WasteReport.objects.create(**data)
            self.stdout.write(f"Created {len(reports)} waste reports")

        if not Pickup.objects.exists():
            pickups = [
                {
                    "pickup_id": "WC-2026-000284", "user": demo_citizen,
                    "waste_type": "MIXED", "pickup_type": "HOME",
                    "status": "EN_ROUTE", "pickup_date": datetime.now().date(),
                    "time_slot": "Morning (9-12)", "latitude": 12.9716, "longitude": 77.5946,
                    "address": "123 Green Street, Eco District",
                    "collector": demo_collector,
                },
                {
                    "pickup_id": "WC-2026-000283", "user": demo_citizen,
                    "waste_type": "RECYCLABLES", "pickup_type": "HOME",
                    "status": "COMPLETED", "pickup_date": datetime.now().date() - timedelta(days=2),
                    "time_slot": "Afternoon (12-3)", "latitude": 12.9720, "longitude": 77.5960,
                    "address": "456 Green Street, Eco District",
                    "collector": demo_collector, "actual_weight_kg": 12.5,
                    "completed_at": datetime.now() - timedelta(days=2),
                },
                {
                    "pickup_id": "WC-2026-000282", "user": demo_business,
                    "waste_type": "E_WASTE", "pickup_type": "BUSINESS",
                    "status": "ASSIGNED", "pickup_date": datetime.now().date(),
                    "time_slot": "Evening (3-6)", "latitude": 12.9750, "longitude": 77.6000,
                    "address": "Tech Park Building 4",
                    "collector": demo_collector,
                },
            ]
            created_pickups = []
            for data in pickups:
                created_pickups.append(Pickup.objects.create(**data))
            self.stdout.write(f"Created {len(created_pickups)} pickups")

        if not WastePassport.objects.exists():
            passport = WastePassport.objects.create(
                passport_id="WP-2026-000001",
                pickup=Pickup.objects.get(pickup_id="WC-2026-000283"),
                origin="RESIDENTIAL",
                input_weight_kg=12.5,
                plastic_recovered_kg=3.2,
                paper_recovered_kg=2.1,
                organic_recovered_kg=4.4,
                metal_recovered_kg=0.8,
                rdf_produced_kg=1.5,
                inert_kg=0.3,
                residual_kg=0.2,
                processing_status="COMPLETED",
                completed_at=datetime.now() - timedelta(days=1),
            )
            self.stdout.write(f"Created passport {passport.passport_id}")

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully"))
        self.stdout.write("Passwords (all): admin12345")
        self.stdout.write("Users: admin@wastechakra.com, citizen@wastechakra.com, collector@wastechakra.com, business@wastechakra.com, facility@wastechakra.com")

    def _get_or_create_user(self, email, username, first, last, role):
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username": username,
                "first_name": first,
                "last_name": last,
                "role": role,
            },
        )
        if created:
            user.set_password("admin12345")
            user.save()
            UserProfile.objects.create(user=user)
            self.stdout.write(f"Created {role} user: {email}")
        return user
