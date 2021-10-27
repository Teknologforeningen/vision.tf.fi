# Generated by Django 3.1.7 on 2021-10-27 17:40

from django.db import migrations

def extract_donor(apps, schema_editor):
    Donor = apps.get_model("donations", "Donor")
    Donation = apps.get_model("donations", "Donation")
    for donation in Donation.objects.all():
        donor = Donor(
            name = f"{donation.first_name} {donation.last_name}",
            pseudonym = donation.pseudonym,
            email = donation.email,
            address = donation.address,
            zip_code = donation.zip_code,
            city = donation.city,
            country = donation.country
        )
        donor.save()
        donation.donor = donor
        donation.save()


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0017_auto_20211027_1739'),
    ]

    operations = [
        migrations.RunPython(extract_donor)
    ]
