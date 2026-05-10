/**
 * AJAX functionality for Version History
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize versions functionality
    initVersions();
});

function initVersions() {
    // Add version form
    const addVersionForm = document.querySelector('.content-section .form');
    if (addVersionForm) {
        addVersionForm.addEventListener('submit', handleAddVersion);
    }
}

function handleAddVersion(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    // Get form values
    const versionInput = form.querySelector('input[name="version"]');
    const bodyInput = form.querySelector('textarea[name="body"]');

    if (!versionInput.value.trim()) {
        showMessage('Please enter a version number', 'error');
        versionInput.focus();
        return;
    }

    if (!bodyInput.value.trim()) {
        showMessage('Please enter a description', 'error');
        bodyInput.focus();
        return;
    }

    showLoading(submitButton);

    const formData = serializeForm(form);

    ajaxRequest(
        '/blog/api/versions/add/',
        'POST',
        formData,
        function (response) {
            hideLoading(submitButton);

            if (response.success) {
                // Clear form
                versionInput.value = '';
                bodyInput.value = '';

                // Add new version to list
                addVersionToList(response.post);

                showMessage('Version added successfully');
            } else {
                showMessage(response.error || 'Failed to add version', 'error');
            }
        },
        function (xhr) {
            hideLoading(submitButton);
            showMessage('Error adding version. Please try again.', 'error');
        }
    );
}

function addVersionToList(postData) {
    const postsContainer = document.querySelector('.content-section');

    if (!postsContainer) return;

    // Remove no-posts message if present
    const noPosts = document.querySelector('.no-posts');
    if (noPosts) noPosts.remove();

    // Create post element
    const postArticle = document.createElement('article');
    postArticle.className = 'post';

    // Format date
    const date = new Date(postData.created_at);
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    // Convert line breaks to <br> tags
    const formattedBody = postData.body.replace(/\n/g, '<br>');

    postArticle.innerHTML = `
        <div class="post-date">${formattedDate}</div>
        <h2 class="post-title">${postData.version}</h2>
        <div class="post-body">${formattedBody}</div>
    `;

    // Add animation
    postArticle.style.opacity = '0';
    postArticle.style.transform = 'translateY(-20px)';

    // Insert at the beginning of the content section (before the form)
    const formSection = document.querySelector('.content-section:last-child');
    if (formSection) {
        formSection.parentNode.insertBefore(postArticle, formSection);
    } else {
        postsContainer.parentNode.insertBefore(postArticle, postsContainer);
    }

    // Animate in
    setTimeout(() => {
        postArticle.style.transition = 'all 0.3s ease';
        postArticle.style.opacity = '1';
        postArticle.style.transform = 'translateY(0)';
    }, 10);

    // Scroll to new post
    setTimeout(() => {
        postArticle.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 350);
}
