/**
 * AJAX utilities for Django application
 */

// CSRF token handling for AJAX requests
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// AJAX request helper
function ajaxRequest(url, method, data, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                successCallback(response);
            } catch (e) {
                console.error('Error parsing JSON response:', e);
                if (errorCallback) errorCallback(xhr);
            }
        } else {
            if (errorCallback) errorCallback(xhr);
        }
    };
    
    xhr.onerror = function() {
        if (errorCallback) errorCallback(xhr);
    };
    
    // Convert data object to URL-encoded string
    const encodedData = Object.keys(data).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    
    xhr.send(encodedData);
}

// Show notification message
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.ajax-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `ajax-message message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Loading indicator
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
        const originalText = element.textContent;
        element.setAttribute('data-original-text', originalText);
        element.textContent = 'Loading...';
        element.disabled = true;
    }
}

function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
        const originalText = element.getAttribute('data-original-text');
        if (originalText) {
            element.textContent = originalText;
        }
        element.disabled = false;
    }
}

// Form data serialization
function serializeForm(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}