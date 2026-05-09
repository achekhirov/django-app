from django.shortcuts import render
from importlib import import_module

version = import_module('__version__').VERSION

def home(request):
    return render(request, "main/index.html")

def about(request):
    return render(request, "main/about.html")
