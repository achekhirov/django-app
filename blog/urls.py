from django.urls import path
from . import views

urlpatterns = [
    # Страница версий (посты)
    path('versions/', views.versions, name='versions'),

    # TODO-лист (задачи)
    path('todo/', views.todo, name='todo'),

    # Дополнительные маршруты для блога (можно добавить позже)
    # path('posts/', views.post_list, name='post_list'),
    # path('posts/<int:pk>/', views.post_detail, name='post_detail'),
]
