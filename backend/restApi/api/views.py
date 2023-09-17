# your_app/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth import logout as django_logout

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password)
        
        # You can also add additional fields to the user model if needed
        
        return Response(status=status.HTTP_201_CREATED)
# your_app/views.py
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


# your_app/views.py
@api_view(['POST'])
def LogoutView(request):
    django_logout(request)
    return Response(status=status.HTTP_200_OK)


