# Generated by Django 3.1.7 on 2021-10-30 10:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0029_auto_20211030_1005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donationletter',
            name='donation_sum',
        ),
        migrations.RemoveField(
            model_name='donationletter',
            name='donation_visibility',
        ),
        migrations.RemoveField(
            model_name='donationletter',
            name='donor',
        ),
        migrations.RemoveField(
            model_name='donationletter',
            name='form_data',
        ),
        migrations.RemoveField(
            model_name='donationletter',
            name='greeting',
        ),
        migrations.RemoveField(
            model_name='donationletter',
            name='group_name',
        ),
        migrations.RemoveField(
            model_name='donationletter',
            name='organization',
        ),
        migrations.AlterField(
            model_name='donationletter',
            name='contribution',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='donations.contribution'),
        ),
    ]
