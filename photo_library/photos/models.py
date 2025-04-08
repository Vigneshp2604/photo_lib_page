
from django.db import models

class Directory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Photo(models.Model):
    image = models.ImageField(upload_to='photos/')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    tags = models.CharField(max_length=200, blank=True)
    directory = models.ForeignKey(Directory, on_delete=models.CASCADE, related_name='photos')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
