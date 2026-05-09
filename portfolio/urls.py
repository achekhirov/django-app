from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include

urlpatterns = [
    # Админка
    path('admin/', admin.site.urls),

    # Основное приложение
    path('', include('main.urls')),

    # Приложение блога
    path('blog/', include('blog.urls')),
]
