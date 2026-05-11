# Background Images and Design Assets

This directory contains background images and design assets for the blog.

## Current Background Images:

### 1. `background-pattern.svg`
- **Usage**: Main background for the entire site
- **Opacity**: 40% (controlled by CSS variable `--bg-image-opacity`)
- **Features**: 
  - Subtle gradient overlay
  - Geometric circles and rectangles
  - Grid lines for structure
  - Dots pattern for texture

### 2. `section-bg.svg`
- **Usage**: Background for content sections
- **Opacity**: 10% (hardcoded in CSS)
- **Features**:
  - Radial gradient center
  - Abstract curved paths
  - Floating geometric shapes
  - Subtle grid overlay

### 3. `todo-bg.svg`
- **Usage**: Special background for ToDo page
- **Opacity**: 15% for ToDo container, 10% for check pattern
- **Features**:
  - Checkmark pattern overlay
  - Task list visual elements
  - Interactive UI elements (checkboxes, delete buttons)
  - Connection lines between tasks

## How to Customize Backgrounds:

### 1. Change Opacity
Edit `main/static/css/style.css` and modify these variables:
```css
:root {
  --bg-image-opacity: 0.4; /* Change this value (0.1 to 0.8) */
}
```

### 2. Replace Background Images
1. Create your own SVG files
2. Replace the existing SVG files in this directory
3. Ensure they have the same dimensions and naming

### 3. Add New Background Images
1. Add new SVG file to this directory
2. Update CSS to reference it:
```css
.new-section::before {
  background-image: url('../images/your-new-bg.svg');
  opacity: 0.3; /* Adjust as needed */
}
```

## Design Principles:

### Color Scheme
The backgrounds use the site's primary color palette with low opacity:
- Primary Blue: `#4361ee` (opacity: 0.02-0.05)
- Secondary Purple: `#7209b7` (opacity: 0.015-0.03)
- Success Teal: `#4cc9f0` (opacity: 0.02-0.04)
- Danger Pink: `#f72585` (opacity: 0.015-0.03)

### Opacity Guidelines
- **Main background**: 30-50% (as requested)
- **Section backgrounds**: 10-20%
- **Pattern overlays**: 5-15%
- **Decorative elements**: 1-5%

### SVG Optimization Tips
1. Use simple shapes and paths
2. Minimize node count
3. Use gradients instead of multiple shapes
4. Reuse patterns with `<defs>` and `<use>`
5. Keep file size under 50KB

## Creating Custom Backgrounds:

### Using Figma/Illustrator
1. Design at 400x400px or 600x400px
2. Use low opacity colors (1-10%)
3. Export as SVG
4. Optimize with SVGO or similar tool

### Using CSS Gradients (Alternative)
If you prefer pure CSS backgrounds:
```css
.background-gradient {
  background: 
    radial-gradient(circle at 20% 80%, rgba(67, 97, 238, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(114, 9, 183, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(248, 249, 250, 0.8) 0%, rgba(233, 236, 239, 0.8) 100%);
}
```

## Performance Considerations:
1. SVG files are vector-based and scale perfectly
2. Low opacity reduces visual noise
3. Background images are fixed (don't scroll with content)
4. CSS `backdrop-filter` creates glass morphism effect
5. All images are optimized SVGs (small file size)

## Browser Support:
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ SVG background images
- ✅ CSS custom properties (variables)
- ✅ `backdrop-filter` (semi-transparent with blur)
- ⚠️ Older browsers may show solid colors instead of transparency effects