from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, VehicleTypeViewSet, ParkingPlaceViewSet, ParkingLotViewSet,
    ParkingDetailsViewSet, PaymentDetailsViewSet, LogDetailsViewSet, 
    get_parking_places, get_payments, login  # Ensure this is an API view
)

# Initialize the router for viewsets
# router = DefaultRouter()
# router.register(r'users', UserViewSet)
# router.register(r'vehicle-types', VehicleTypeViewSet)
# router.register(r'parking-places', ParkingPlaceViewSet)
# router.register(r'parking-lots', ParkingLotViewSet)
# router.register(r'parking-details', ParkingDetailsViewSet)
# router.register(r'payment-details', PaymentDetailsViewSet)
# router.register(r'log-details', LogDetailsViewSet)

urlpatterns = [
    # path('api/', include(router.urls)),  # Include all viewsets under /api/
    
    # Function-based views
    path('api/parking-places/', get_parking_places, name='get-parking-places'),
    path('api/payments/', get_payments, name='get-payments'),
    
    # Authentication view (login)
    path('api/login/', login, name='login'),
]
