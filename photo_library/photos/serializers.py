

from rest_framework import serializers
from .models import Photo, Directory

class DirectorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Directory
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    directory_name = serializers.CharField(source='directory.name', read_only=True)
    class Meta:
        model = Photo
        fields = ['id', 'title', 'description', 'tags', 'image', 'directory', 'directory_name']

