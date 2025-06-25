from rest_framework.routers import DefaultRouter
from .views import CrisisViewSet

router = DefaultRouter()
router.register(r'crisis', CrisisViewSet, basename='crisis')

urlpatterns = router.urls
