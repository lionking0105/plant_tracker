from django.contrib import admin
from django.urls import path
from .api import api
from django.conf import settings
from django.conf.urls.static import static
from tracker.views import frontend

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
    path("", frontend, name="frontend"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)