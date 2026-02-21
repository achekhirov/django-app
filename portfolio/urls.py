from django.contrib import admin
from django.contrib.auth import views as auth_views

from django.urls import path
from main.views import index, about, versions, home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('versions/', versions, name='versions'),  # ← именно так!
    path('login/', auth_views.LoginView.as_view(template_name="main/login.html"), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
