from rest_framework import serializers
from .models import Exam

class ExamSerializer(serializers.ModelSerializer):
    ai_summary = serializers.CharField(read_only=True)

    class Meta:
        model = Exam
        fields = ['id', 'name', 'date', 'file', 'user', 'ai_summary']