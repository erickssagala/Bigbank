from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.home, name="home"),
    path('signup',views.signup, name="signup"),
    path('signup_page',views.signup_page, name="signup_page"),
    path('login',views.login, name="login"),
    path('dash',views.dash, name="dash"),
    path('logout',views.logout, name="logout"),
    path('verification_failed',views.verification_failed, name="verification_failed"),
    path('activate/<uidb64>/<token>',views.activate, name="activate")

]