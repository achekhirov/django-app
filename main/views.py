from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from blog.models import Post
from blog.forms import PostForm
from django.http import HttpResponse

def index(request):
    return render(request, "main/index.html")


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

