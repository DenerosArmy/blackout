import webbrowser 
from urllib import * 

AUTHORIZE_URL = 'https://dev.tendrilinc.com/oauth/authorize?response_type=code&client_id=a4ca80c12d6fc2612858602edc4d75dd&redirect_uri=http://localhost:1337/auth&scope=account consumption device&state=dog'



webbrowser.open(AUTHORIZE_URL) 
