from django.shortcuts import render, redirect
from django.http import HttpResponse
from blog.models import Post
# Create your views here.

from blog.forms import PostForm

def add(request):
    form = PostForm()
    posts = Post.objects.all()
    return render(request, 'main/versions.html', {'posts': posts })

def index(request):
    return render(request,"main/index.html")

def about(request):
    return render(request,"main/about.html")

def versions(request):
    posts = Post.objects.all()
    form = PostForm()
    if request.method == "POST":
        form = PostForm(request.POST)
        form.save()
        return redirect(versions)
    return render(request,"main/versions.html",{'posts': posts, 'form': form})
