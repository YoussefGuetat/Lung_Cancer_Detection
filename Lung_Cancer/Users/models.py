# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django_countries.fields import CountryField


class CustomUserManager(BaseUserManager):
    def create_user(self,username, first_name, last_name, email,date_of_birth,gender,country, password=None, role='user'):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model( username=username, first_name=first_name, last_name=last_name, email=email,date_of_birth=date_of_birth, gender=gender,country=country,role='user')
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, first_name, last_name, email, password, role='admin'):
        user = self.create_user(username, first_name, last_name, email, password, role='admin')
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user
    

class Patient(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255,null=False,blank=False)
    last_name = models.CharField(max_length=255,null=False,blank=False)
    password = models.CharField(null=False,max_length=20)  
    date_joined = models.DateTimeField(default=timezone.now)
    date_of_birth = models.DateField(null=False, blank=False)
    gender = models.CharField(
        max_length=10,
        null=False,
        blank=False,
        choices=[
            ('M', 'Male'),
            ('F', 'Female'),
            ('O', 'Other'),
        ],
    )
    country = CountryField()
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Administrator'),
    ]
    role = models.CharField(
        max_length=10,
        null=False,
        blank=False,
        choices=ROLE_CHOICES,
        default='user',  
    )

    def __str__(self):
        return self.username
    
    def delete(self, *args, **kwargs):
        try:
            user = User.objects.get(username=self.username)
            user.delete()
        except User.DoesNotExist:
            pass  

        super().delete(*args, **kwargs)
    
    
    # Ajouter related_name aux champs groups et user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='utilisateur_groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='utilisateur_permissions'
    )


    objects = CustomUserManager()  # Définir le gestionnaire d'utilisateurs personnalisé comme attribut d'objets

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name', 'last_name', 'email', 'password','date_of_birth','gender','country']
