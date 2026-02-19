```markdown
# Django Blog Project


This is a simple Django‑based blog project with a modular structure. Below is a detailed explanation of the project layout, configuration, and best practices.


## Project Structure


```
.
├── blog/                  # Blog functionality (posts, comments, categories)
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── db.sqlite3            # SQLite database (if used)
├── main/                # Main site content (home, about, contacts)
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── static/           # Static files (CSS, JS, images)
│   ├── templates/        # HTML templates
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── manage.py             # Django command-line utility
├── portfolio/            # Project core (settings, main URL config)
│   ├── __init__.py
│   ├── asgi.py           # ASGI application entry point
│   ├── settings.py       # Project settings
│   ├── urls.py           # Main URL configuration
│   └── wsgi.py          # WSGI application entry point
├── requirements.txt      # Python dependencies
└── .env                  # Environment variables (SECRET_KEY, DEBUG, etc.)
```

## Key Components

### 1. `blog` App
- **Purpose**: Manages blog‑related functionality.
- **Features**:
  - Blog posts (list and detail views).
  - Comments system (if implemented).
  - Categories/tags (if needed).
- **URLs**: Typically served under `/blog/`.

- **Key Files**:
  - `models.py`: Defines `Post`, `Comment`, `Category` models.
  - `views.py`: Handles post listing and detail pages.
  - `urls.py`: Defines blog‑specific routes.
  - `templates/blog/`: HTML templates for blog pages.

### 2. `main` App
- **Purpose**: Core site content (home page, about, contact, etc.).
- **Features**:
  - Home page (`/`).
  - "About" page (`/about/`).
  - Contact page (`/contacts/`).
  - Shared base templates (e.g., `base.html`).
- **URLs**: Served under root (`/`) or custom paths.
- **Key Files**:
  - `views.py`: Renders home and static pages.
  - `urls.py`: Routes for main app.
  - `static/`: CSS, JS, and images.
  - `templates/main/`: HTML templates.

### 3. `portfolio` Module
- **Purpose**: Project core (not a content app).
- **Contains**:
  - `settings.py`: Global Django settings (database, security, installed apps, etc.).
  - `urls.py`: Main URL router (directs requests to `main`, `blog`, etc.).
  - `wsgi.py`/`asgi.py`: Entry points for WSGI/ASGI servers.
- **Note**: This is **not added** to `INSTALLED_APPS` in `settings.py`.


## Configuration

### Environment Variables (`.env`)
Store sensitive data in `.env` (don't commit to Git!):
```env
SECRET_KEY=your-very-long-random-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

Use `python-decouple` or `django-environ` to load variables in `settings.py`:
```python
from decouple import config
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')])
```

### Django Settings (`portfolio/settings.py`)
Key sections:
- `SECRET_KEY`: Never hardcode in `settings.py` — use `.env`.
- `DEBUG`: Set to `False` in production.
- `ALLOWED_HOSTS`: List allowed domains/IPs.
- `INSTALLED_APPS`: Include `main`, `blog`, and Django core apps.
- `STATIC_URL`/`STATICFILES_DIRS`: Configure static files.
- `TEMPLATES`: Define template directories.

Example:
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',
    'blog',
]

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'main' / 'static']
```

## Running the Project

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment**:
   - Create `.env` with required variables.
   - Activate virtual environment (if used).

3. **Apply migrations**:
   ```bash
   python manage.py migrate
   ```

4. **Collect static files** (if using `STATICFILES_DIRS`):
   ```bash
   python manage.py collectstatic
   ```

5. **Run server**:
   ```bash
   python manage.py runserver
   ```

6. **Access the site**:
   - Admin: `http://127.0.0.1:8000/admin/`
   - Home: `http://127.0.0.1:8000/`
   - Blog: `http://127.0.0.1:8000/blog/`

## Deployment Tips

### Static Files
- For production, serve static files via **Nginx** or **Object Storage** (e.g., Yandex Object Storage, AWS S3).
- Update `STATIC_URL` to point to your CDN/storage endpoint.

### Security
- Set `DEBUG = False` in production.
- Restrict `ALLOWED_HOSTS`.
- Use HTTPS (enable `SECURE_*` settings in `settings.py`).

### Scaling
- Consider Docker for containerized deployment.
- Use `django-extensions` for advanced commands (e.g., `show_urls`).

## Troubleshooting

### Common Errors
1. **`ImproperlyConfigured: Requested setting TEMPLATES...`**
   - Fix: Ensure `DJANGO_SETTINGS_MODULE` is set in `manage.py` or environment.
   - In `manage.py`, use:
     ```python
     os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio.settings'
     ```

2. **`SECRET_KEY setting must not be empty`**
   - Fix: Verify `.env` exists and contains `SECRET_KEY`.

3. **`No module named 'portfolio'`**
   - Fix: Ensure `portfolio/` is in the project root and has `__init__.py`.

## Contributing

- Follow Django best practices (modular apps, clean code).
- Keep `.env` secure (never share).
- Test changes locally before deployment.

## License

[MIT](LICENSE)
```
