# Generated by Django 3.2.11 on 2022-01-16 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0004_auto_20211205_1556'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='confirmation_email_sent',
            field=models.BooleanField(default=False),
        ),
    ]