from pathlib import Path
from decouple import config


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)


ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'blog.alexeychekhirov.net']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main.apps.MainConfig',
    'health_check',
    'health_check.db',
    'health_check.cache',
    'health_check.storage',
    'blog.apps.BlogConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  # ← исправлено
        'DIRS': [BASE_DIR / 'main' / 'templates'],  # ← добавлено
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'blogdb',  # имя вашей базы
        'USER': 'blog',     # пользователь MySQL
        'PASSWORD': config('PASSWORD'), # пароль
        'HOST': 'c-c9q34g8inr49i4r1obtk.rw.mdb.yandexcloud.net',  # FQDN/IP MySQL
        'PORT': '3306',
        # Опционально: SSL (если требует Yandex Cloud)
        'OPTIONS': {
            'ssl': {
                'ca': '/home/achekhirov/.mysql/root.crt',  # если нужен сертификат
            },
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = '/home/achekhirov/django-app/static/'
