from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes , authentication_classes 
from .serializers import *
from django.contrib.auth import  login, logout
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from random import choice


#User
    
@api_view(["POST"])
def register_user_api_view(request):
    if request.method == "POST":
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user_data = serializer.data  
            message = f"User '{user_data['username']}' created successfully."
            return Response({"message": message, "user": user_data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            user.last_login = timezone.now()
            user.save()
            
            token, created = Token.objects.get_or_create(user=user)

            return Response({'message': 'Successful login!', 'token': token.key}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    logout(request)

    request.auth.delete()

    return Response({'message': 'Successful logout!'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_logged_in_user_info(request):
    user = request.user  
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def list_user(request,id=None):
    patient = Patient.objects.get(id=id)
    serializer = CustomUserSerializer(patient)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['PUT'])
def update_user(request, id=None):
    patient = get_object_or_404(Patient, id=id)
    serializer = RegisterSerializer(instance=patient, data=request.data)
    if serializer.is_valid():
        role_data = serializer.validated_data.pop('role')
        is_superuser = (role_data == 'admin')

        try:
            user = User.objects.get(username=patient.username)
            user.username = serializer.validated_data['username']
            user.email = serializer.validated_data['email']
            user.is_superuser = is_superuser
            user.is_staff = is_superuser
            user.save()
        except User.DoesNotExist:
            pass  

        serializer.validated_data['is_superuser'] = is_superuser
        serializer.save()

        patient.role = role_data
        patient.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_user(request, id=None):
    try:
        patient = Patient.objects.get(id=id)
        patient.delete()
        return Response("User successfully deleted!")
    except Patient.DoesNotExist:
        return Response("User not found.", status=status.HTTP_404_NOT_FOUND)
    


#Reponse 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_response(request):
    random_question = choice(Question.objects.filter(is_active=True))
    
    if not random_question:
        return Response({"error": "No questions available."}, status=status.HTTP_404_NOT_FOUND)
    
    text_response = request.data.get('text_response') if random_question.question_type == 'TEXT' else None
    numeric_response = request.data.get('numeric_response') if random_question.question_type == 'RATING' else None
    bool_response = request.data.get('bool_response') if random_question.question_type == 'YES_NO_MAYBE' else None
    emoji_response = request.data.get('emoji_response') if random_question.question_type == 'EMOJI' else None
    
    response_data = {
        'user': request.user.id,
        'question': random_question.id,
        'text_response': text_response,
        'numeric_response': numeric_response,
        'bool_response': bool_response,
        'emoji_response': emoji_response
    }
    serializer = ResponseSerializer(data=response_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)