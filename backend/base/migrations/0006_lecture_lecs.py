# Generated by Django 3.2.9 on 2021-11-28 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_comment_createdat'),
    ]

    operations = [
        migrations.AddField(
            model_name='lecture',
            name='lecs',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
