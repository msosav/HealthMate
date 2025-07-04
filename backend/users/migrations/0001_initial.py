# Generated by Django 5.2.3 on 2025-06-25 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=100)),
                ('birth_date', models.DateField()),
                ('location', models.CharField(max_length=255)),
                ('height', models.FloatField()),
                ('weight', models.FloatField()),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
            ],
        ),
    ]
