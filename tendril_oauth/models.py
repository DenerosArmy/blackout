from django.db import models

# Create your models here.



class Data(models.Model):
	access_token = CharField(max_length=50);
	token_type = CharField(max_length=50);
	expires_in = CharField(max_length=50); 
	refresh_token = CharField(max_length=50);
	scope = CharField(max_length = 50);
	state = CharFIeld(max_length = 50);
	 


