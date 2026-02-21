from email.policy import default
from django.db import models

# Create your models here.
class Post(models.Model):
    version = models.CharField(max_length=12)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
