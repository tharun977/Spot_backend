from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import HttpResponse
from .models import User, VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails
from .serializers import (
    UserSerializer, VehicleTypeSerializer, ParkingPlaceSerializer, ParkingLotSerializer,
    ParkingDetailsSerializer, PaymentDetailsSerializer, LogDetailsSerializer
)

def homepage(request):
    return HttpResponse("Welcome to the Smart Parking Management Tool!")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Modify as needed for authentication

class VehicleTypeViewSet(viewsets.ModelViewSet):
    queryset = VehicleType.objects.all()
    serializer_class = VehicleTypeSerializer
    permission_classes = [AllowAny]

class ParkingPlaceViewSet(viewsets.ModelViewSet):
    queryset = ParkingPlace.objects.all()
    serializer_class = ParkingPlaceSerializer
    permission_classes = [AllowAny]

# Function-based API (Custom Filtering or Response)
@api_view(['GET'])
def get_parking_places(request):
    parking_places = ParkingPlace.objects.all()
    serializer = ParkingPlaceSerializer(parking_places, many=True)
    return Response(serializer.data)

class ParkingLotViewSet(viewsets.ModelViewSet):
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer
    permission_classes = [AllowAny]

class ParkingDetailsViewSet(viewsets.ModelViewSet):
    queryset = ParkingDetails.objects.all()
    serializer_class = ParkingDetailsSerializer
    permission_classes = [AllowAny]

class PaymentDetailsViewSet(viewsets.ModelViewSet):
    queryset = PaymentDetails.objects.all()
    serializer_class = PaymentDetailsSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
def get_payments(request):
    payments = PaymentDetails.objects.all()
    serializer = PaymentDetailsSerializer(payments, many=True)
    return Response(serializer.data)

class LogDetailsViewSet(viewsets.ModelViewSet):
    queryset = LogDetails.objects.all()
    serializer_class = LogDetailsSerializer
    permission_classes = [AllowAny]
