# Generated by Django 3.1.7 on 2021-05-22 10:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0006_auto_20210316_2039'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='DonationLetter',
            new_name='Donation',
        ),
    ]