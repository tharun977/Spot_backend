from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
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
    user_id = request.data.get('user_id')
    password = request.data.get('password')

    if not user_id or not password:
        return Response({"error": "Both user ID and password are required"}, status=400)

    # Authenticate the user
    user = authenticate(username=user_id, password=password)
    
    if user is not None:
        # User is authenticated, get the role
        role = user.role  # assuming the role field is part of the User model
        tokens = get_tokens_for_user(user)  # Generate JWT tokens
        return Response({
            "success": True,
            "role": role,
            "tokens": tokens
        })
    else:
        return Response({"success": False, "error": "Invalid credentials"}, status=401)

# Helper function to generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# User viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Use IsAuthenticated for securing this view

# VehicleType viewset
class VehicleTypeViewSet(viewsets.ModelViewSet):
    queryset = VehicleType.objects.all()
    serializer_class = VehicleTypeSerializer
    permission_classes = [AllowAny]  # Anyone can access vehicle types

# ParkingPlace viewset
class ParkingPlaceViewSet(viewsets.ModelViewSet):
    queryset = ParkingPlace.objects.all()
    serializer_class = ParkingPlaceSerializer
    permission_classes = [IsAuthenticated]  # Requires user to be authenticated

class ParkingPlaceListCreateView(APIView):
    permission_classes = [IsAuthenticated]  # Protect this view with authentication

    def get(self, request):
        spots = ParkingPlace.objects.all()
        serializer = ParkingPlaceSerializer(spots, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ParkingPlaceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Function-based API for fetching parking places
@api_view(['GET'])
def get_parking_places(request):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    parking_places = ParkingPlace.objects.all()
    serializer = ParkingPlaceSerializer(parking_places, many=True)
    return Response(serializer.data)

# ParkingLot viewset
class ParkingLotViewSet(viewsets.ModelViewSet):
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer
    permission_classes = [AllowAny]  # Open access for parking lots

# ParkingDetails viewset
class ParkingDetailsViewSet(viewsets.ModelViewSet):
    queryset = ParkingDetails.objects.all()
    serializer_class = ParkingDetailsSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication for accessing parking details

# PaymentDetails viewset
class PaymentDetailsViewSet(viewsets.ModelViewSet):
    queryset = PaymentDetails.objects.all()
    serializer_class = PaymentDetailsSerializer
    permission_classes = [IsAuthenticated]  # Payment details require authentication

# Function-based API for fetching payments
@api_view(['GET'])
def get_payments(request):
    permission_classes = [IsAuthenticated]  # Ensure user is authenticated
    payments = PaymentDetails.objects.all()
    serializer = PaymentDetailsSerializer(payments, many=True)
    return Response(serializer.data)

# LogDetails viewset
class LogDetailsViewSet(viewsets.ModelViewSet):
    queryset = LogDetails.objects.all()
    serializer_class = LogDetailsSerializer
    permission_classes = [IsAuthenticated]  # Log details should be accessible by authenticated users
