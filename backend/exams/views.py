from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Exam
from .serializers import ExamSerializer
from django.conf import settings
import os
from rest_framework.permissions import IsAuthenticated

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [IsAuthenticated]  # Adjust as needed

    def create(self, request, *args, **kwargs):
        # Extract file and data
        file = request.FILES.get('file')
        data = request.data.copy()
        data.pop('file', None)  # Remove file from data for initial save

        # Save Exam without file and ai_summary
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        exam = serializer.save()

        # Save file if present
        if file:
            user_id = exam.user.id
            exam_id = exam.id
            upload_dir = os.path.join(settings.MEDIA_ROOT, 'files', str(user_id), str(exam_id))
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            # Update file_path field (relative to MEDIA_ROOT)
            exam.file = f'files/{user_id}/{exam_id}/{file.name}'

        # Generate ai_summary (dummy example)
        exam.ai_summary = "AI summary generated here."

        exam.save()
        response_serializer = self.get_serializer(exam)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)