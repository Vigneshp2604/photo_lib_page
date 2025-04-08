from django.contrib import admin

# Register your models here.

from .models import Photo, Directory

admin.site.register(Photo)
admin.site.register(Directory)