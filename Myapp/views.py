from django.shortcuts import render,redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib import messages
from Myapp import models  # Make sure to import your models

def home(request):
    return render(request, 'Myapp/home.html')

def project(request):
    return render(request, 'Myapp/project.html')

def Giftshop(request):
    return render(request, 'Myapp/GiftShop.html')

def Burger(request):
    return render(request, 'Myapp/Burger.html')

def Movie(request):
    return render(request, 'Myapp/Movie.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, "Login successful! Welcome back.")
            return redirect('home')  # Redirect to home page
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, 'Myapp/login.html')

def Signup(request):
    if request.method == 'POST':
        # Process form data here (e.g., saving the user)
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        # Add your form validation and user creation logic here

        # Redirect to home page after successful signup
        return redirect('home')  # 'home' is the name of your home URL pattern

    # Render the signup form if it's a GET request
    return render(request, 'Myapp/signup.html')


def contact(request):
    success = False  # Initialize success variable
    error = False    # Initialize error variable
    error_message = ""  # Initialize an error message

    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # Save contact form data to the database
        contact_entry = models.Contact(name=name, email=email, subject=subject, message=message)
        contact_entry.save()

        # Send email notification
        try:
            send_mail(
                subject=f"New Contact Form Submission: {subject}",
                message=f"Name: {name}\nEmail: {email}\nMessage: {message}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            success = True  # Set success to True if email is sent successfully
        except Exception as e:
            print(f"Error sending email: {e}")
            error = True  # Set error to True if an exception occurs
            error_message = "An error occurred while sending your message. Please try again later."

    # Render the contact template with success and error statuses
    return render(request, 'Myapp/contact.html', {
        'success': success,
        'error': error,
        'error_message': error_message
    })
