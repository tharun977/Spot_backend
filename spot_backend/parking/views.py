from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
from .models import User, VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails
from .serializers import (
    UserSerializer, VehicleTypeSerializer, ParkingPlaceSerializer, ParkingLotSerializer,
    ParkingDetailsSerializer, PaymentDetailsSerializer, LogDetailsSerializer
)

# Homepage view
def homepage(request):
    return HttpResponse("Welcome to the Smart Parking Management Tool!")

# Login view for user authentication
@api_view(['POST'])
def login(request):
    """
    Login endpoint that authenticates the user and returns a JWT token.
    """
    username = request.data.get('user_id')
    password = request.data.get('password')

    if not username or not password:
        return Response({'detail': 'Username and password are required.'}, status=400)

    # Authenticate user
    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({
            'success': True,
            'access_token': access_token,
            'refresh_token': str(refresh),
            'role': user.role  # Send back the user's role if needed
        })
    else:
        return Response({'detail': 'Invalid credentials.'}, status=401)

# User viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# VehicleType viewset
class VehicleTypeViewSet(viewsets.ModelViewSet):
    queryset = VehicleType.objects.all()
    serializer_class = VehicleTypeSerializer
    permission_classes = [AllowAny]

# ParkingPlace viewset
class ParkingPlaceViewSet(viewsets.ModelViewSet):
    queryset = ParkingPlace.objects.all()
    serializer_class = ParkingPlaceSerializer
    permission_classes = [AllowAny]

# Function-based API for fetching parking places
@api_view(['GET'])
def get_parking_places(request):
    parking_places = ParkingPlace.objects.all()
    serializer = ParkingPlaceSerializer(parking_places, many=True)
    return Response(serializer.data)

# ParkingLot viewset
class ParkingLotViewSet(viewsets.ModelViewSet):
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer
    permission_classes = [AllowAny]

# ParkingDetails viewset
class ParkingDetailsViewSet(viewsets.ModelViewSet):
    queryset = ParkingDetails.objects.all()
    serializer_class = ParkingDetailsSerializer
    permission_classes = [AllowAny]

# PaymentDetails viewset
class PaymentDetailsViewSet(viewsets.ModelViewSet):
    queryset = PaymentDetails.objects.all()
    serializer_class = PaymentDetailsSerializer
    permission_classes = [AllowAny]

# Function-based API for fetching payments
@api_view(['GET'])
def get_payments(request):
    payments = PaymentDetails.objects.all()
    serializer = PaymentDetailsSerializer(payments, many=True)
    return Response(serializer.data)

# LogDetails viewset
class LogDetailsViewSet(viewsets.ModelViewSet):
    queryset = LogDetails.objects.all()
    serializer_class = LogDetailsSerializer
    permission_classes = [AllowAny]
