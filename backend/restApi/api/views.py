# your_app/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth import logout as django_logout
from ..serializers import UserSerializer

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')


        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password)
        
        # You can also add additional fields to the user model if needed
        
        return Response(status=status.HTTP_201_CREATED)

from rest_framework_simplejwt.tokens import AccessToken

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate a JWT token for the authenticated user
        token = AccessToken.for_user(user)

        return Response({'token': str(token)}, status=status.HTTP_200_OK)


# your_app/views.py
@api_view(['POST'])
def LogoutView(request):
    django_logout(request)
    return Response(status=status.HTTP_200_OK)


