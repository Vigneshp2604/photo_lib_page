
from django import forms
from .models import Photo, Directory

class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ['title', 'description', 'image', 'directory', 'tags']
        
class DirectoryForm(forms.ModelForm):
    class Meta:
        model = Directory
        fields = ['name', 'parent']