from django import forms

from .models import Post


class PostForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Добавляем классы Bulma к каждому полю
        for field_name in self.fields:
            self.fields[field_name].widget.attrs['class'] = 'input is-rounded'


    class Meta:
        model = Post
        fields = ['version', 'body']  # укажите нужные поля
