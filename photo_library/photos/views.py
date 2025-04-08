# gallery/views.py

from rest_framework import viewsets
from .models import Photo, Directory
from .serializers import PhotoSerializer, DirectorySerializer
from rest_framework import filters

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'tags']

class DirectoryViewSet(viewsets.ModelViewSet):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer


    