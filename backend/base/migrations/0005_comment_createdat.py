# Generated by Django 3.2.9 on 2021-11-27 04:09

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_course_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
