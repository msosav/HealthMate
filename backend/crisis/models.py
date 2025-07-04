from django.db import models
from healthmate.utils import TimeStampedModel
from users.models import User

class Crisis(TimeStampedModel):
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.TextField(blank=True)

    def __str__(self):
        return self.name
