/**
 * AJAX functionality for To-Do list
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize todo functionality
    initTodo();
});

function initTodo() {
    // Add task form
    const addTaskForm = document.querySelector('.add-task-form');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', handleAddTask);
    }

    // Initialize existing task forms
    initTaskForms();
}

function initTaskForms() {
    // Toggle completion forms
    const toggleForms = document.querySelectorAll('.task-checkbox-form');
    toggleForms.forEach(form => {
        const checkbox = form.querySelector('.task-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function (e) {
                e.preventDefault();
                handleToggleTask(this);
            });
        }
    });

    // Delete forms
    const deleteForms = document.querySelectorAll('.task-delete-form');
    deleteForms.forEach(form => {
        const button = form.querySelector('.delete-btn');
        if (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                handleDeleteTask(this);
            });
        }
    });
}

function handleAddTask(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const input = form.querySelector('input[name="title"]');

    if (!input.value.trim()) {
        showMessage('Please enter a task description', 'error');
        return;
    }

    showLoading(submitButton);

    const formData = serializeForm(form);

    ajaxRequest(
        '/blog/api/todo/add/',
        'POST',
        formData,
        function (response) {
            hideLoading(submitButton);

            if (response.success) {
                // Clear input
                input.value = '';

                // Add new task to list
                addTaskToList(response.task);

                showMessage('Task added successfully');
            } else {
                showMessage(response.error || 'Failed to add task', 'error');
            }
        },
        function (xhr) {
            hideLoading(submitButton);
            showMessage('Error adding task. Please try again.', 'error');
        }
    );
}

function handleToggleTask(checkbox) {
    const form = checkbox.closest('form');
    const taskItem = checkbox.closest('.task-item');

    if (!form || !taskItem) return;

    const formData = serializeForm(form);

    ajaxRequest(
        '/blog/api/todo/toggle/',
        'POST',
        formData,
        function (response) {
            if (response.success) {
                // Update UI
                if (response.task.is_completed) {
                    taskItem.classList.add('completed');
                    taskItem.querySelector('.task-title').style.textDecoration = 'line-through';
                } else {
                    taskItem.classList.remove('completed');
                    taskItem.querySelector('.task-title').style.textDecoration = 'none';
                }

                // Update checkbox state
                checkbox.checked = response.task.is_completed;

                showMessage('Task updated');
            } else {
                // Revert checkbox state on error
                checkbox.checked = !checkbox.checked;
                showMessage(response.error || 'Failed to update task', 'error');
            }
        },
        function (xhr) {
            // Revert checkbox state on error
            checkbox.checked = !checkbox.checked;
            showMessage('Error updating task. Please try again.', 'error');
        }
    );
}

function handleDeleteTask(button) {
    const form = button.closest('form');
    const taskItem = button.closest('.task-item');

    if (!form || !taskItem) return;

    const formData = serializeForm(form);

    ajaxRequest(
        '/blog/api/todo/delete/',
        'POST',
        formData,
        function (response) {
            if (response.success) {
                // Remove task from UI with animation
                taskItem.style.transition = 'all 0.3s ease';
                taskItem.style.opacity = '0';
                taskItem.style.transform = 'translateX(-100%)';
                taskItem.style.height = '0';
                taskItem.style.margin = '0';
                taskItem.style.padding = '0';
                taskItem.style.border = 'none';

                setTimeout(() => {
                    taskItem.remove();

                    // Check if list is empty
                    const taskList = document.querySelector('.task-list');
                    if (taskList && taskList.children.length === 0) {
                        showNoTasksMessage();
                    }
                }, 300);

                showMessage('Task deleted');
            } else {
                showMessage(response.error || 'Failed to delete task', 'error');
            }
        },
        function (xhr) {
            showMessage('Error deleting task. Please try again.', 'error');
        }
    );
}

function addTaskToList(taskData) {
    const taskList = document.querySelector('.task-list');

    if (!taskList) {
        // Create task list if it doesn't exist
        const todoContainer = document.querySelector('.todo-container');
        if (!todoContainer) return;

        // Remove no-tasks message if present
        const noTasks = document.querySelector('.no-tasks');
        if (noTasks) noTasks.remove();

        // Create task list
        const newTaskList = document.createElement('ul');
        newTaskList.className = 'task-list';
        todoContainer.appendChild(newTaskList);

        taskList = newTaskList;
    }

    // Create task item
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${taskData.is_completed ? 'completed' : ''}`;
    taskItem.innerHTML = `
        <form method="post" class="task-checkbox-form" style="display: inline;">
            <input type="hidden" name="action" value="toggle">
            <input type="hidden" name="task_id" value="${taskData.id}">
            <input type="checkbox" class="task-checkbox" ${taskData.is_completed ? 'checked' : ''}
                aria-label="Toggle completion for task: ${taskData.title}">
        </form>
        <span class="task-title" style="${taskData.is_completed ? 'text-decoration: line-through;' : ''}">
            ${taskData.title}
        </span>
        <form method="post" class="task-delete-form" style="display: inline;">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="task_id" value="${taskData.id}">
            <button type="button" class="delete-btn">[×]</button>
        </form>
    `;

    // Add animation
    taskItem.style.opacity = '0';
    taskItem.style.transform = 'translateY(-20px)';
    taskList.appendChild(taskItem);

    // Animate in
    setTimeout(() => {
        taskItem.style.transition = 'all 0.3s ease';
        taskItem.style.opacity = '1';
        taskItem.style.transform = 'translateY(0)';
    }, 10);

    // Initialize event listeners for new task
    const checkbox = taskItem.querySelector('.task-checkbox');
    if (checkbox) {
        checkbox.addEventListener('change', function (e) {
            e.preventDefault();
            handleToggleTask(this);
        });
    }

    const deleteButton = taskItem.querySelector('.delete-btn');
    if (deleteButton) {
        deleteButton.addEventListener('click', function (e) {
            e.preventDefault();
            handleDeleteTask(this);
        });
    }
}

function showNoTasksMessage() {
    const todoContainer = document.querySelector('.todo-container');
    if (!todoContainer) return;

    const noTasksDiv = document.createElement('div');
    noTasksDiv.className = 'no-tasks';
    noTasksDiv.innerHTML = '<p>No tasks yet. Add your first task above!</p>';

    const taskList = document.querySelector('.task-list');
    if (taskList) {
        taskList.remove();
    }

    const addTaskForm = document.querySelector('.add-task-form');
    if (addTaskForm) {
        todoContainer.insertBefore(noTasksDiv, addTaskForm.nextSibling);
    } else {
        todoContainer.appendChild(noTasksDiv);
    }
}
