from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, register

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register, name='register'),
]
