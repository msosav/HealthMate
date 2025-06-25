from rest_framework import viewsets, permissions
from .models import Exam
from .serializers import ExamSerializer

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [permissions.AllowAny]  # Adjust as needed

    def perform_create(self, serializer):
        # Save with user from request if needed
        serializer.save()
