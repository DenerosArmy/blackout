from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    args = ''
    help = 'Logs in using OAuth'

    def handle(self, *args, **options):
        from tendril_oauth import login
