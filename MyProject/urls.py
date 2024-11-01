"""
URL configuration for MyProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from Myapp import views as myapp_views  # Use an alias to avoid confusion

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', myapp_views.home, name='home'),
    path('contact/', myapp_views.contact, name='contact'),
    path('login/', myapp_views.login, name='login'),
    path('signup/', myapp_views.Signup, name='signup'),
    path('project/', myapp_views.project, name='project'),
    path('Giftshop/', myapp_views.Giftshop, name='Giftshop'),
    path('Burger/', myapp_views.Burger, name='Burger'),
    path('Movie/', myapp_views.Movie, name='Movie'),
    path('Ecommerce/', include('store.urls')),  # Ensure a trailing slash
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

