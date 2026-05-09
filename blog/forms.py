from django import forms
from .models import Post, Task


class PostForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add CSS classes to form fields
        for field_name in self.fields:
            self.fields[field_name].widget.attrs['class'] = 'form-control'

        # Set specific attributes for each field
        self.fields['version'].widget.attrs.update({
            'placeholder': 'e.g., 1.0.0 or v2.1',
            'aria-label': 'Version number'
        })

        self.fields['body'].widget.attrs.update({
            'placeholder': 'Describe what changed in this version...',
            'aria-label': 'Version description',
            'rows': 4
        })

    class Meta:
        model = Post
        fields = ['version', 'body']
        widgets = {
            'body': forms.Textarea()
        }


class TaskForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add CSS class to the field
        self.fields['title'].widget.attrs['class'] = 'form-control'
        self.fields['title'].widget.attrs.update({
            'placeholder': 'What I am going to do next is...',
            'aria-label': 'New task description'
        })

    class Meta:
        model = Task
        fields = ['title']
