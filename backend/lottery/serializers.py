from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User
import re

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    phone_number = serializers.CharField(max_length=15)
    lottery_number = serializers.CharField(read_only=True)

    def validate_phone_number(self, value):
        # Example: Validate phone number format (e.g., 10 digits)
        if not re.match(r'^\d{10}$', value):
            raise serializers.ValidationError("Phone number must be 10 digits.")
        return value

    class Meta:
        model = User
        fields = ['email', 'phone_number', 'username', 'lottery_number']