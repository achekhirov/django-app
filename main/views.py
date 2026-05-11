from django.shortcuts import render
from importlib import import_module

def home(request):
    return render(request, "main/index.html")

def about(request):
    return render(request, "main/about.html")
