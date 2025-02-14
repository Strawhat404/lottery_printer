from django.db.models import Min
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

class RegisterView(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            last_number = User.objects.aggregate(Min('lottery_number'))['lottery_number__min']
            next_number = str(int(last_number) - 1) if last_number else '88888888'
            serializer.save(lottery_number=next_number)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)