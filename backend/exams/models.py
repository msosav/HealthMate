from django.db import models
from healthmate.utils import TimeStampedModel
from users.models import User
import os

def exam_file_path(instance, filename):
    # Save file to files/{user_id}/{exam_id}/{filename}
    return f"files/{instance.user.id}/{instance.id}/{filename}"

class Exam(TimeStampedModel):
    name = models.CharField(max_length=255)
    date = models.DateField()
    file = models.FileField(upload_to=exam_file_path, null=True, blank=True)  # Allow null/blank
    ai_summary = models.TextField(null=True, blank=True)  # Allow null/blank

    def __str__(self):
        return f"{self.name} ({self.user})"
