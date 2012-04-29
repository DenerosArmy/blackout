import webbrowser
from urllib import * 
from django.http import HttpResponse, HttpResponseRedirect
from django import forms
from django.forms.fields import MultipleChoiceField
from django.forms.widgets import CheckboxSelectMultiple
from django.shortcuts import render_to_response
from django.core.context_processors import csrf
import requests 
import json 
from models import Data, BlacklistedMAC
from scraper import scraper
API_KEY = 'a4ca80c12d6fc2612858602edc4d75dd'
APP_SECRET = '08096b9b773a9e48205cd9fa9534390d' 

class MACAddressForm(forms.Form):
    addresses = forms.MultipleChoiceField(widget=CheckboxSelectMultiple, choices=[]) 

def authorized(request):
    c = {}
    c.update(csrf(request))
    with open("scraper/sample.html") as f:
        addresses = scraper.genAddrList(f.read())
        addresses = [(x, 'Test (' + x + ')') for x in addresses]

    if request.method == 'POST': # If the form has been submitted...
        form = MACAddressForm(request.POST) # A form bound to the POST data
        form.fields['addresses'].choices = addresses
        if form.is_valid():
            choices = form.cleaned_data['addresses']
            BlacklistedMAC.objects.all().delete()
            for mac in choices:
                obj = BlacklistedMAC(address=mac)
                obj.save()
            return HttpResponseRedirect('/done/') # Redirect after POST
    else:
        form = MACAddressForm()
        form.fields['addresses'].choices = addresses
        if 'code' in request.GET:
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

    c['form'] = form
    return render_to_response('auth.html', c)

def done(request):
    return HttpResponse('Thanks!')
