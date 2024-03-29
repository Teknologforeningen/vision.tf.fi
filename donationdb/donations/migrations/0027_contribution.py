# Generated by Django 3.1.7 on 2021-10-30 10:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0026_remove_donationletter_pseudonym'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contribution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visibility', models.TextField(choices=[['visible', 'visible'], ['anonymous', 'anonymous']])),
                ('sum', models.DecimalField(decimal_places=2, max_digits=12)),
                ('greeting', models.TextField(blank=True)),
                ('group_name', models.CharField(blank=True, max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('donor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='donations.donor')),
                ('organization', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='donations.organization')),
            ],
        ),
    ]
