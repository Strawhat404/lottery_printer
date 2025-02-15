from django.db import models
from django.core.validators import RegexValidator
import uuid

# Phone number validator
phone_regex = RegexValidator(
    regex=r'^\d{10}$',  # Example: 10 digits
    message="Phone number must be 10 digits."
)

class User(models.Model):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True, validators=[phone_regex])
    username = models.CharField(max_length=50, unique=True)
    lottery_number = models.CharField(max_length=8, unique=True, default=uuid.uuid4().hex[:8])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.lottery_number}"