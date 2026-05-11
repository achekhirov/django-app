# Favicon Instructions

This directory contains favicon files for the blog.

## Current Files:
- `favicon.svg` - SVG version of the favicon (modern browsers)
- `favicon.ico` - ICO format for older browsers (to be generated)

## How to generate favicon.ico:

### Option 1: Using Online Converter
1. Visit https://convertio.co/svg-ico/ or similar service
2. Upload `favicon.svg`
3. Download as `favicon.ico`
4. Place in this directory

### Option 2: Using Command Line (if ImageMagick installed)
```bash
convert favicon.svg -resize 64x64 favicon.ico
```

### Option 3: Using Python (Pillow library)
```python
from PIL import Image
import cairosvg

# Convert SVG to PNG
cairosvg.svg2png(url='favicon.svg', write_to='favicon.png')

# Convert PNG to ICO
img = Image.open('favicon.png')
img.save('favicon.ico', format='ICO', sizes=[(64, 64)])
```

## Favicon Sizes Needed:
- 16x16 pixels (browser tabs)
- 32x32 pixels (taskbar shortcuts)
- 64x64 pixels (desktop icons)
- 180x180 pixels (Apple devices)

## HTML Usage:
The favicon is already linked in `base.html`:
```html
<link rel="icon" href="{% static 'images/favicon.ico' %}" type="image/x-icon">
```

For modern browsers that support SVG:
```html
<link rel="icon" href="{% static 'images/favicon.svg' %}" type="image/svg+xml">
```

## Design:
The favicon features:
- Gradient background (#4361ee to #7209b7)
- White letter "A" (for Alexey)
- Decorative corner dots
- Modern, clean design matching the blog's aesthetic