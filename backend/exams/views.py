from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Exam
from .serializers import ExamSerializer
from django.conf import settings
import os
from rest_framework.permissions import IsAuthenticated
import requests

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    def create(self, request, *args, **kwargs):
        # Extract file and data
        file = request.FILES.get('file')
        data = request.data.copy()
        data.pop('file', None)  # Remove file from data for initial save

        # Extract and remove analyze_with_ai from data before serializer
        analyze_with_ai = data.pop('analyze_with_ai', False)
        # Convert to boolean if it's a string
        if isinstance(analyze_with_ai, str):
            analyze_with_ai = analyze_with_ai.lower() == 'true'

        # Save Exam without file and ai_summary
        serializer = self.get_serializer(data=data)
        if not serializer.is_valid():
            print(serializer.errors)  # Or use logging
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        exam = serializer.save()

        # Save file if present
        if file:
            exam_id = exam.id
            upload_dir = os.path.join(settings.MEDIA_ROOT, 'files', str(exam_id))
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            # Update file_path field (relative to MEDIA_ROOT)
            exam.file = f'files/{exam_id}/{file.name}'

        # Only generate ai_summary if requested
        if analyze_with_ai:
            exam.ai_summary = self.get_ai_summary(file_path)

        exam.save()
        response_serializer = self.get_serializer(exam)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    def get_ai_summary(self, file_path):
        url = "http://localhost:8001/ask"  # Update if your RAG service runs elsewhere
        question = (
            "Based on the provided, please explain the results in simple terms and offer clear recommendations. "
            "Only use the available information; do not ask for additional details, and be concise not more than 20 words to respond."
        )
        try:
            with open(file_path, "rb") as f:
                files = {"pdf": (os.path.basename(file_path), f, "application/pdf")}
                data = {"question": question, "save": "false"}
                response = requests.post(url, files=files, data=data)
                if response.status_code == 200:
                    result = response.json()
                    # If result is a dict with 'answer' or similar, adjust as needed
                    return result.get("answer") or result.get("summary") or str(result)
                else:
                    return f"AI summary error: {response.text}"
        except Exception as e:
            return f"AI summary error: {str(e)}"