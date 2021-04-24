from django.urls import include, path
from rest_framework import routers
from app import views
from app.controllers import UploadController

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    
    # UPLOADER
    path('api/upload/file-non-geo', UploadController.upload_file_non_geo),
    path('api/upload/file', UploadController.upload_file),
    path('api/upload/link', UploadController.upload_link),
]