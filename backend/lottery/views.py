from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.db import transaction

class LotteryNumberGenerator:
    _current_number = 88888888

    @classmethod
    def get_next_number(cls):
        current = cls._current_number
        cls._current_number -= 1
        return str(current).zfill(8)

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        try:
            with transaction.atomic():
                # Generate lottery number
                lottery_number = LotteryNumberGenerator.get_next_number()
                
                # Create user with generated lottery number
                user = User.objects.create(
                    email=serializer.validated_data['email'],
                    phone_number=serializer.validated_data['phone_number'],
                    username=serializer.validated_data['username'],
                    lottery_number=lottery_number
                )
                
                return Response({
                    'message': 'Registration successful',
                    'lottery_number': lottery_number
                }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)