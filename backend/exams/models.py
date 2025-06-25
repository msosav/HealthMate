from django.db import models
from users.models import User
import os

def exam_file_path(instance, filename):
    # Save file to files/{user_id}/{exam_id}/{filename}
    return f"files/{instance.user.id}/{instance.id}/{filename}"

class Exam(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    file_path = models.FileField(upload_to=exam_file_path)
    ai_summary = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exams')

    def __str__(self):
        return f"{self.name} ({self.user})"
