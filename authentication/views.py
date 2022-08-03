from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as user_login, logout as user_logout
from login import settings
from django.core.mail import send_mail, EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from . tokens import generate_token

# Create your views here.
def home(request):
    return render(request, "authentication/home_page.html")

def signup(request):
    if request.method == "POST":

        username = request.POST['username']
        firstname = request.POST['firstname']
        lastname = request.POST['lastname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        if User.objects.filter(username=username):
            messages.error(request, "username already exists!")
            return redirect('home')

        if User.objects.filter(email=email):
            messages.error(request, "email already registered!")
            return redirect('home')

        if len(username)>10 or len(username)<6:
            messages.error(request, "username must be between 6 and 10 characters long!")

        if pass1 != pass2:
            messages.error(request, "passwords didn't match!")

        if not username.isalnum():
            messages.error(request, "username must be alpha numeric!")
            return redirect('home')

        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = firstname
        myuser.last_name = lastname
        myuser.is_active = False

        myuser.save()

        messages.success(request, "Account successfully created! \n We have sent you a confirmation link, check your email to activate account")


        #Welcome Email
        Subject = "Welcome to BigBank"
        message = "Hello"+ myuser.first_name + "!! \n" + "Welcome to BigBank!! \n Thank you for visiting our website \n We have also sent you a confirmation email, Please confirm your Email address to activate your account. \n\n Thank you \nBigBank"
        from_email = settings.EMAIL_HOST_USER
        to_list = [myuser.email]
        send_mail(Subject, message, from_email, to_list, fail_silently = True)

        #Email activation
        current_site = get_current_site(request)
        email_subject = "confirm your email@bigbank login"
        message2 = render_to_string('email_confirmation.html',{
            'name': myuser.first_name,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(myuser.pk)),
            'token': generate_token.make_token(myuser)
        })
        email = EmailMessage(
            email_subject,
            message2,
            settings.EMAIL_HOST_USER,
            [myuser.email],
        )
        email.fail_silently = False
        email.send()
        
        return redirect('home')

    return render(request, "authentication/home_page.html")

def login(request):
    if request.method == "POST":
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username = username, password = pass1)

        if user is not None:
            user_login(request, user)
            firstname = user.first_name
            return render(request, "authentication/dash.html", {'firstname':firstname})
        else:
            messages.error(request, "Incorrect details! Please activate your account Or Sign up to create account")
            return render(request, 'authentication/home_page.html')

    return render(request, "authentication/login.html")

def verification_failed(request):
    pass
def dash(request):
    pass

def logout(request):
    user_logout(request)
    messages.success(request, "Logout successful!")
    return redirect('home')

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        myuser = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        myuser = None
    
    if myuser is not None and generate_token.check_token(myuser, token):
        myuser.is_active = True
        myuser.save()
        user_login(request, myuser)
        return render(request, "authentication/dash.html", {'firstname':myuser.first_name})
        #return redirect('home')
    else:
        return render(request, 'activation_failed.html')
