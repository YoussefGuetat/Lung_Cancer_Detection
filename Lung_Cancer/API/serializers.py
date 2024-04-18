from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from django_countries.serializer_fields import CountryField
from Users.models import Patient
from django.contrib.auth.models import User
from Questions.models import Question
from Responses.models import Response

#User

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    country = CountryField()

    class Meta:
        model = Patient
        fields = '__all__'
       

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        role_data = validated_data.pop('role', 'user')

        is_superuser = (role_data == 'admin')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_superuser=is_superuser,
            is_staff=is_superuser
        )

        validated_data.pop('groups', None)
        validated_data.pop('user_permissions', None)

        patient = Patient.objects.create(**validated_data)
        patient.user_ptr = user
        patient.save()

        patient.role = role_data

        return patient




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User is inactive.")
                data['user'] = user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")

        return data


#Question
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


#Response
class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        text_response = cleaned_data.get('text_response')
        numeric_response = cleaned_data.get('numeric_response')
        bool_response = cleaned_data.get('bool_response')
        emoji_response = cleaned_data.get('emoji_response')

        non_null_count = sum(1 for response in [text_response, numeric_response, bool_response, emoji_response] if response is not None)

        if non_null_count != 1:
            raise serializers.ValidationError("Only one response field should be non-null.")