from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser
from healthmate.utils import TimeStampedModel

class User(AbstractBaseUser, TimeStampedModel):
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    birth_date = models.DateField()
    location = models.CharField(max_length=255)
    height = models.FloatField()
    weight = models.FloatField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return f"{self.name} {self.lastname}"
