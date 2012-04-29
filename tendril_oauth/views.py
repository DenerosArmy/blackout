from webbrowser import * 
from urllib import * 
from django.http import HttpResponse

API_KEY = 'a4ca80c12d6fc2612858602edc4d75dd'
APP_SECRET = '08096b9b773a9e48205cd9fa9534390d' 
AUTHORIZE_URL = 'https://dev.tendrilinc.com/oauth/authorize?response_type=code&client_id=a4ca80c12d6fc2612858602edc4d75dd&redirect_uri=localhost:1337/auth&scope=\'consumption\'&state=dog'



def authorized(request):
	print(request.GET[u'code']) 
	return HttpResponse("Authorized!") 


