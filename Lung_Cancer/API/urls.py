from .views import *
from django.urls import path


urlpatterns = [
    #User
    path('register', register_user_api_view, name='register'),
    path('login', user_login, name='login'),
    path('logout', user_logout, name='logout'),
    path('user-info', get_logged_in_user_info, name='user-info'),
    path('list_user/<int:id>', list_user, name='list_user'),
    path('update_user/<int:id>', update_user, name='update_user'),
    path('delete_user/<int:id>', delete_user, name='delete_user'),


    #Response
     path('add-response', add_response, name='add_response'),

    
]