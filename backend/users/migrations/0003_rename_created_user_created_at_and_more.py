# Generated by Django 5.2.3 on 2025-06-25 20:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_managers_user_created_user_last_login_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='created',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='last_updated',
            new_name='updated_at',
        ),
    ]
