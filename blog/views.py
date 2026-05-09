from django.shortcuts import render, redirect
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
