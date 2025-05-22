from django.db import models
from django.contrib.auth.models import User
from django.core.validators import EmailValidator, MinLengthValidator

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(validators=[EmailValidator()])

    def __str__(self):
        return self.user.username

class Post(models.Model):
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField(validators=[MinLengthValidator(10)])
    image = models.ImageField(upload_to='posts/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
