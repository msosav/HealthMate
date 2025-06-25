from django.db import models
from healthmate.utils import TimeStampedModel
from users.models import User

class Appointment(TimeStampedModel):
    name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    address = models.CharField(max_length=255)
    comments = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')

    def __str__(self):
        return f"{self.name} on {self.date} at {self.time}"
