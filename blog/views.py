from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Post, Task
from .forms import PostForm, TaskForm

def versions(request):
    posts = Post.objects.all().order_by('-created_at')
    form = PostForm()

    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('versions')

    return render(
        request,
        "main/versions.html",  # Шаблон остается в main/templates/
        {'posts': posts, 'form': form}
    )

def todo(request):
    tasks = Task.objects.all().order_by('-created_at')
    form = TaskForm()

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'add':
            form = TaskForm(request.POST)
            if form.is_valid():
                form.save()
            return redirect('todo')

        elif action == 'toggle':
            task_id = request.POST.get('task_id')
            task = Task.objects.get(id=task_id)
            task.is_completed = not task.is_completed
            task.save()
            return redirect('todo')

        elif action == 'delete':
            task_id = request.POST.get('task_id')
            Task.objects.filter(id=task_id).delete()
            return redirect('todo')

    return render(request, 'main/todo.html', {'tasks': tasks, 'form': form})

# API Views for AJAX

@require_POST
@csrf_exempt
def api_add_task(request):
    """API endpoint for adding a task via AJAX"""
    try:
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save()
            return JsonResponse({
                'success': True,
                'task': {
                    'id': task.id,
                    'title': task.title,
                    'is_completed': task.is_completed,
                    'created_at': task.created_at.isoformat()
                }
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid form data'
            })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        })

@require_POST
@csrf_exempt
def api_toggle_task(request):
    """API endpoint for toggling task completion via AJAX"""
    try:
        task_id = request.POST.get('task_id')
        if not task_id:
            return JsonResponse({
                'success': False,
                'error': 'Task ID is required'
            })

        task = Task.objects.get(id=task_id)
        task.is_completed = not task.is_completed
        task.save()

        return JsonResponse({
            'success': True,
            'task': {
                'id': task.id,
                'title': task.title,
                'is_completed': task.is_completed,
                'created_at': task.created_at.isoformat()
            }
        })
    except Task.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'Task not found'
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        })

@require_POST
@csrf_exempt
def api_delete_task(request):
    """API endpoint for deleting a task via AJAX"""
    try:
        task_id = request.POST.get('task_id')
        if not task_id:
            return JsonResponse({
                'success': False,
                'error': 'Task ID is required'
            })

        Task.objects.filter(id=task_id).delete()

        return JsonResponse({
            'success': True,
            'message': 'Task deleted successfully'
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        })

@require_POST
@csrf_exempt
def api_add_version(request):
    """API endpoint for adding a version via AJAX"""
    try:
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save()
            return JsonResponse({
                'success': True,
                'post': {
                    'id': post.id,
                    'version': post.version,
                    'body': post.body,
                    'created_at': post.created_at.isoformat()
                }
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid form data'
            })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        })
