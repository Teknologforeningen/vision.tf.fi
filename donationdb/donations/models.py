from django.db import models
from rest_framework import serializers

class Donor(models.Model):
    name = models.CharField(max_length=250)
    pseudonym = models.CharField(max_length=250, blank=True)
    email = models.CharField(max_length=250)
    address = models.TextField(blank=True)
    zip_code = models.CharField(max_length=250, blank=True)
    city = models.CharField(max_length=250, blank=True)
    country = models.CharField(max_length=250, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name if self.pseudonym == "" else (
            f"{self.name} ({self.pseudonym})"
        )


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ["name", "pseudonym", "email"]


class Organization(models.Model):
    name = models.CharField(max_length=250)
    fo_number = models.CharField(max_length=250, blank=True)
    address = models.TextField(blank=True)
    zip_code = models.CharField(max_length=250, blank=True)
    city = models.CharField(max_length=250, blank=True)
    country = models.CharField(max_length=250, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Contribution(models.Model):
    VISIBILITY_CHOICES = [
        ["visible", "visible"],
        ["anonymous", "anonymous"]
    ]

    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    organization = models.ForeignKey(
        Organization,
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )

    visibility = models.TextField(choices=VISIBILITY_CHOICES)
    sum = models.DecimalField(max_digits=12, decimal_places=2)
    greeting = models.TextField(blank=True)
    group_name = models.CharField(max_length=50, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def display_name(self):
        return self.organization.name if (self.organization is not None) else \
            self.donor.pseudonym if self.visibility == "pseudonym" else self.donor.name


    def __str__(self):
        organization_or_name = f"{self.display_name()}: {self.sum} €"
        return organization_or_name


class ContributionSerializer(serializers.ModelSerializer):
    donor = DonorSerializer()
    class Meta:
        model = Contribution
        fields = ["donor", "visibility", "sum", "greeting", "group_name"]


class DonationLetter(models.Model):
    VISIBILITY_CHOICES = [
        ["visible", "visible"],
        ["anonymous", "anonymous"]
    ]

    contribution = models.ForeignKey(Contribution, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(blank=True, null=True)
    is_paid = models.BooleanField(default=False)
    link_to_pdf = models.URLField(blank=True, max_length=2000)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        organization_or_name = \
            f"{self.contribution.organization.name}: {self.contribution.sum} € ({self.created_at.date()})" if (self.contribution.organization is not None) \
            else f"{self.contribution.donor.name}: {self.contribution.sum} € ({self.created_at.date()})"
        return organization_or_name
