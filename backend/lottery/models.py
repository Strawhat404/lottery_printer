from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    username = models.CharField(max_length=50, unique=True)
    lottery_number = models.CharField(max_length=8, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.lottery_number}"