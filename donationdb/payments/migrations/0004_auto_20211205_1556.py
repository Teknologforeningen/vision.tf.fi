# Generated by Django 3.1.7 on 2021-12-05 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0003_auto_20211107_1202'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='checkout_reference',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddIndex(
            model_name='transaction',
            index=models.Index(fields=['checkout_transaction_id'], name='payments_tr_checkou_31dd51_idx'),
        ),
    ]
