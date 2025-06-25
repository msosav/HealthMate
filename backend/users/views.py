import datetime
from django.db import IntegrityError
from django.http import JsonResponse
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate, get_user_model

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            data = JSONParser().parse(request)
            today = datetime.date.today()
            birth_date = datetime.datetime.strptime(
                data["birth_date"], "%Y-%m-%d"
            ).date()
            if birth_date > today:
                return JsonResponse(
                    {"birth_date": ["Birth date cannot be in the future"]}, status=400
                )
            user = User(
                name=data["name"],
                lastname=data["lastname"],
                birth_date=data["birth_date"],
                location=data["location"],
                height=data["height"],
                weight=data["weight"],
                email=data["email"].lower(),
                password=data["password"],
            )
            user.set_password(data["password"])
            user.save()
            token = Token.objects.create(user=user)
            return JsonResponse({"token": token.key, "id": user.id}, status=201)
        except IntegrityError:
            return JsonResponse({"error": "Email already exists"}, status=400)
        
@csrf_exempt
def login(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        User = get_user_model()
        try:
            User.objects.get(email=data["email"].lower())
        except User.DoesNotExist:
            return JsonResponse(
                {"error": "No user found."},
                status=400,
            )
        user = authenticate(
            request, email=data["email"].lower(), password=data["password"]
        )
        if user is None:
            return JsonResponse(
                {"error": "Check your email and password."},
                status=400,
            )
        else:
            try:
                token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            return JsonResponse({"token": str(token), "id": user.id}, status=200)