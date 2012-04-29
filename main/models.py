from django.db import models

class Data(models.Model):
    access_token = models.CharField(max_length=50)
    token_type = models.CharField(max_length=50)
    expires_in = models.CharField(max_length=50)
    refresh_token = models.CharField(max_length=50)
    scope = models.CharField(max_length=50)
    state = models.CharField(max_length=50)

    def __unicode__(self):
		return self.access_token

class PhoneNumber(models.Model):
    phone = models.CharField(max_length=10)

    def __unicode__(self):
		return self.phone

class BlacklistedMAC(models.Model):
    address = models.CharField(max_length=50)

    def __unicode__(self):
		return self.address
