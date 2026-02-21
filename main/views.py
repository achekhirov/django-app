from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from blog.models import Post, Task
from blog.forms import PostForm, TaskForm
from django.http import HttpResponse

def index(request):
    return render(request, "main/index.html")

def todo(request):
    tasks = Task.objects.all().order_by('-created_at')
    form = TaskForm()

    if request.method == 'POST':
        action = request.POST.get('action')  # определяем действие

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

def home(request):
    return render(request, "main/index.html")


def about(request):
    return render(request, "main/about.html")

@login_required
def versions(request):
    posts = Post.objects.all().order_by('-created_at')  # сортировка по дате
    form = PostForm()

    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('versions')  # перенаправление по имени URL


    return render(
        request,
        "main/versions.html",
        {'posts': posts, 'form': form}
    )

