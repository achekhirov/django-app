/**
 * Modern Animations and Interactions for Alexey's Blog
 * This file adds smooth animations, scroll effects, and interactive enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================================================
    // Scroll Animations
    // ==========================================================================
    
    // Animate elements on scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.content-section, .post, .task-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==========================================================================
    // Parallax Background Effect
    // ==========================================================================
    
    function initParallax() {
        const mainElement = document.querySelector('.main');
        if (!mainElement) return;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (mainElement.style.backgroundPosition) {
                mainElement.style.backgroundPosition = `center ${rate}px`;
            }
        });
    }
    
    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal page anchors
                if (href === '#' || href.startsWith('#!')) return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // ==========================================================================
    // Interactive Card Effects
    // ==========================================================================
    
    function initCardEffects() {
        const cards = document.querySelectorAll('.content-section, .post');
        
        cards.forEach(card => {
            // Tilt effect on mouse move
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
                this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                this.style.boxShadow = 'var(--shadow-lg)';
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 300);
            });
        });
    }
    
    // ==========================================================================
    // Button Ripple Effect
    // ==========================================================================
    
    function initRippleButtons() {
        const buttons = document.querySelectorAll('.btn:not(.btn-outline)');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // ==========================================================================
    // Form Input Enhancements
    // ==========================================================================
    
    function initFormEnhancements() {
        const inputs = document.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Add floating label effect if there's a label
            const label = input.previousElementSibling;
            if (label && label.classList.contains('form-label')) {
                input.addEventListener('input', function() {
                    if (this.value) {
                        label.classList.add('has-value');
                    } else {
                        label.classList.remove('has-value');
                    }
                });
            }
        });
        
        // Add CSS for form enhancements
        const formStyle = document.createElement('style');
        formStyle.textContent = `
            .form-group.focused .form-label {
                color: var(--color-primary);
                transform: translateY(-5px);
            }
            
            .form-group.focused .form-control {
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
            }
            
            .form-label.has-value {
                color: var(--color-primary);
            }
        `;
        document.head.appendChild(formStyle);
    }
    
    // ==========================================================================
    // Theme Toggle (Optional - for future dark mode)
    // ==========================================================================
    
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Toggle dark mode';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
        `;
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
            
            // Save preference to localStorage
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️';
        }
        
        // Add dark theme CSS
        const darkThemeStyle = document.createElement('style');
        darkThemeStyle.textContent = `
            .dark-theme {
                --color-text: #e2e8f0;
                --color-text-light: #94a3b8;
                --color-bg: #1a1a2e;
                --color-bg-alt: #16213e;
                --color-bg-dark: #0f172a;
                --color-border: #334155;
                --color-border-light: #475569;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            }
            
            .dark-theme .content-section {
                background: rgba(30, 41, 59, 0.9);
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .dark-theme .header {
                background: rgba(15, 23, 42, 0.95);
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .dark-theme .footer {
                background: #0f172a;
            }
        `;
        document.head.appendChild(darkThemeStyle);
        
        // Only add toggle if user wants it
        // document.body.appendChild(themeToggle);
    }
    
    // ==========================================================================
    // Initialize All Features
    // ==========================================================================
    
    // Initialize features based on user preference
    const features = {
        scrollAnimations: true,
        parallax: false, // Disabled by default as it can be performance intensive
        smoothScroll: true,
        cardEffects: true,
        rippleButtons: true,
        formEnhancements: true,
        themeToggle: false // Disabled by default, can be enabled if needed
    };
    
    // Initialize enabled features
    if (features.scrollAnimations) initScrollAnimations();
    if (features.parallax) initParallax();
    if (features.smoothScroll) initSmoothScroll();
    if (features.cardEffects) initCardEffects();
    if (features.rippleButtons) initRippleButtons();
    if (features.formEnhancements) initFormEnhancements();
    if (features.themeToggle) initThemeToggle();
    
    // ==========================================================================
    // Performance Optimization
    // ==========================================================================
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Clean up animations after scrolling stops
            document.body.classList.remove('scrolling');
        }, 100);
        
        document.body.classList.add('scrolling');
    });
    
    // ==========================================================================
    // Console Welcome Message
    // ==========================================================================
    
    console.log('%c🎨 Alexey\'s Blog - Modern Design 🎨', 'color: #4361ee; font-size: 16px; font-weight: bold;');
    console.log('%c✨ Enhanced with smooth animations and interactive effects ✨', 'color: #7209b7; font-size: 14px;');
    console.log('%c🚀 Features loaded: ' + Object.keys(features).filter(k => features[k]).join(', '), 'color: #4cc9f0;');
});