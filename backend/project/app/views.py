from django.contrib.auth.models import User
from rest_framework import viewsets
from app.serializers import UserSerializer

from app import app_modules

for var in dir(app_modules):
    if var.endswith("ViewSet"):
        globals()[var] = getattr(app_modules, var)
del app_modules

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer