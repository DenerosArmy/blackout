from django.core.management.base import BaseCommand, CommandError
import webbrowser 

AUTHORIZE_URL = 'https://dev.tendrilinc.com/oauth/authorize?response_type=code&client_id=a4ca80c12d6fc2612858602edc4d75dd&redirect_uri=http://localhost:1337/auth&scope=account consumption device&state=cded79abe00bb49dbc54d86fc57a7501'

class Command(BaseCommand):
    args = ''
    help = 'Logs in using OAuth'

    def handle(self, *args, **options):
        webbrowser.open(AUTHORIZE_URL)
