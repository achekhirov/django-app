# Generated by Django 3.1.7 on 2022-10-04 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20221004_1323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='body',
            field=models.TextField(default="What's new has been added?"),
        ),
        migrations.AlterField(
            model_name='post',
            name='version',
            field=models.CharField(max_length=12),
        ),
    ]
