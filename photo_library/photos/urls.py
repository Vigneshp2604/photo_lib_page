
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PhotoViewSet, DirectoryViewSet

router = DefaultRouter()
router.register(r'photos', PhotoViewSet)
router.register(r'directories', DirectoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]