from django.shortcuts import render, redirect
from blog.models import Post
from blog.forms import PostForm
from django.http import HttpResponse

def index(request):
    return render(request, "main/index.html")


def home(request):
    return render(request, "main/index.html")


def about(request):
    return render(request, "main/about.html")


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

# Функция add() удалена — логика перенесена в versions()
def test_view(request):
    return HttpResponse("Test OK")
