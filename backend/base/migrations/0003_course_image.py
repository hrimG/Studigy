# Generated by Django 3.2.9 on 2021-11-15 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_attendancepreference_comment_lecture_schedule'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
