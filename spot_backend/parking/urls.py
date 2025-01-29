from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, VehicleTypeViewSet, ParkingPlaceViewSet, ParkingLotViewSet, ParkingDetailsViewSet, PaymentDetailsViewSet, LogDetailsViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'vehicle-types', VehicleTypeViewSet)
router.register(r'parking-places', ParkingPlaceViewSet)
router.register(r'parking-lots', ParkingLotViewSet)
router.register(r'parking-details', ParkingDetailsViewSet)
router.register(r'payment-details', PaymentDetailsViewSet)
router.register(r'log-details', LogDetailsViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
