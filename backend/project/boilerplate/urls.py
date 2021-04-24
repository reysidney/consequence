from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from app import views
from app.controllers import Controller

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [

    path('api/admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    # UPLOADER
    path('api/test', Controller.test),
]