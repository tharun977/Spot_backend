from rest_framework import viewsets
from .models import User, VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails
from .serializers import UserSerializer, VehicleTypeSerializer, ParkingPlaceSerializer, ParkingLotSerializer, ParkingDetailsSerializer, PaymentDetailsSerializer, LogDetailsSerializer

from django.http import HttpResponse

def homepage(request):
    return HttpResponse("Welcome to the Smart Parking Management Tool!")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class VehicleTypeViewSet(viewsets.ModelViewSet):
    queryset = VehicleType.objects.all()
    serializer_class = VehicleTypeSerializer

class ParkingPlaceViewSet(viewsets.ModelViewSet):
    queryset = ParkingPlace.objects.all()
    serializer_class = ParkingPlaceSerializer

class ParkingLotViewSet(viewsets.ModelViewSet):
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer

class ParkingDetailsViewSet(viewsets.ModelViewSet):
    queryset = ParkingDetails.objects.all()
    serializer_class = ParkingDetailsSerializer

class PaymentDetailsViewSet(viewsets.ModelViewSet):
    queryset = PaymentDetails.objects.all()
    serializer_class = PaymentDetailsSerializer

class LogDetailsViewSet(viewsets.ModelViewSet):
    queryset = LogDetails.objects.all()
    serializer_class = LogDetailsSerializer
