from rest_framework import viewsets
from .models import Crisis
from .serializers import CrisisSerializer
from rest_framework.permissions import IsAuthenticated

class CrisisViewSet(viewsets.ModelViewSet):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
