from django.contrib.auth.models import User
from django.db.models.signals import post_save

from app import app_modules
for var in dir(app_modules):
    if not var.endswith("ViewSet") and not var.endswith("Serializer"):
        globals()[var] = getattr(app_modules, var)
del app_modules
