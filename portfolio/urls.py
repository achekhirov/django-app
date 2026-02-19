from django.contrib import admin
from django.urls import path
from main.views import index, about, versions, home, test_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('versions/', versions, name='versions'),  # ← именно так!
    path('test/', test_view, name='test'),

]
