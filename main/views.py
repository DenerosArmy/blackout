import webbrowser
from urllib import * 
from django.http import HttpResponse
import requests 
import json 
from models import Data
API_KEY = 'a4ca80c12d6fc2612858602edc4d75dd'
APP_SECRET = '08096b9b773a9e48205cd9fa9534390d' 

def authorized(request):
	ACCESS_TOKEN_URL = 'https://dev.tendrilinc.com/oauth/access_token'
	authToken = request.GET[u'code']	
	ACCESS_TOKEN_URL += '?grant_type=authorization_code'
	ACCESS_TOKEN_URL += '&code='+str(authToken)  
	ACCESS_TOKEN_URL += '&redirect_uri=www.google.com' 
	ACCESS_TOKEN_URL += '&client_id='+API_KEY 
	ACCESS_TOKEN_URL += '&client_secret='+APP_SECRET 

	data = requests.get(ACCESS_TOKEN_URL, verify=False).text
	for obj in Data.objects.all():
		obj.delete()
	d = Data(**json.loads(data))
	d.save()
	return HttpResponse(data)


