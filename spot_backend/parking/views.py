from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
from .serializers import (
    UserSerializer, VehicleTypeSerializer, ParkingPlaceSerializer, ParkingLotSerializer,
    ParkingDetailsSerializer, PaymentDetailsSerializer, LogDetailsSerializer, RegisterSerializer
)
from .models import VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails ,User
from rest_framework.views import APIView

# Homepage view
def homepage(request):
    return HttpResponse("Welcome to the Smart Parking Management Tool!")

# Login view for user authentication
@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to access this API
def login(request):
    email = request.data.get('email')  # Use email for authentication
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Both email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.get_full_name(),
                "role": user.role  # Assuming your User model has a 'role' field
            }
        }, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# Helper function to generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# User viewset

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Ensure this references your custom User model
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Secure this view with authentication

# Registration view to create a new user
@api_view(['POST'])
@permission_classes([AllowAny])  # Open to everyone for creating accounts
def register(request):
    # Get user data from request
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        # Create the new user
        user = serializer.save()
        
        # Generate JWT tokens for the newly registered user
        tokens = get_tokens_for_user(user)
        
        return Response({
            "access": tokens['access'],
            "refresh": tokens['refresh'],
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.get_full_name(),
                "role": user.role
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# VehicleType viewset
class VehicleTypeViewSet(viewsets.ModelViewSet):
    queryset = VehicleType.objects.all()
    serializer_class = VehicleTypeSerializer
    permission_classes = [AllowAny]  # Open access for vehicle types

# ParkingPlace viewset with CRUD functionality
class ParkingPlaceViewSet(viewsets.ModelViewSet):
    queryset = ParkingPlace.objects.all()
    serializer_class = ParkingPlaceSerializer
    permission_classes = [IsAuthenticated]  # Requires user authentication

# ParkingPlace APIView for list and creation
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
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def get_parking_places(request):
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
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def get_payments(request):
    payments = PaymentDetails.objects.all()
    serializer = PaymentDetailsSerializer(payments, many=True)
    return Response(serializer.data)

# LogDetails viewset
class LogDetailsViewSet(viewsets.ModelViewSet):
    queryset = LogDetails.objects.all()
    serializer_class = LogDetailsSerializer
    permission_classes = [IsAuthenticated]  # Log details should be accessible by authenticated users
