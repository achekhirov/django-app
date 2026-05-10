from django.urls import path
from . import views

urlpatterns = [
    # Страница версий (посты)
    path('versions/', views.versions, name='versions'),

    # TODO-лист (задачи)
    path('todo/', views.todo, name='todo'),
    # API endpoints for AJAX
    path('api/todo/add/', views.api_add_task, name='api_add_task'),
    path('api/todo/toggle/', views.api_toggle_task, name='api_toggle_task'),
    path('api/todo/delete/', views.api_delete_task, name='api_delete_task'),
    path('api/versions/add/', views.api_add_version, name='api_add_version'),
    # Дополнительные маршруты для блога (можно добавить позже)
    # path('posts/', views.post_list, name='post_list'),
    # path('posts/<int:pk>/', views.post_detail, name='post_detail'),
]
