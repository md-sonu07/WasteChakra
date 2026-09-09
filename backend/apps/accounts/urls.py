from django.urls import path
from .views import RegisterView, LoginView, ProfileView, RefreshTokenView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/refresh/', RefreshTokenView.as_view(), name='token-refresh'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
]
