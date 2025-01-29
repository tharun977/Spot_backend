# spot_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from parking import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('parking.urls')),
    path('', views.homepage, name='homepage'),  # This will map the root URL to your homepage view
]
