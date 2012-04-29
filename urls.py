from django.conf.urls.defaults import *
from main.views import authorized, done
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^wing/', include('wing.foo.urls')),
    ('^auth/$', authorized),
    ('^done/$', done),

    # Uncomment the admin/doc line below to enable admin documentation:
)

urlpatterns += staticfiles_urlpatterns()
