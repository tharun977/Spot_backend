from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import User, ParkingPlace, ParkingLot, ParkingDetail, PaymentDetail, LogDetail, VehicleType

# API View for HomeView
class HomeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)

# API View for LogoutView
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Assumes you have implemented the blacklist functionality
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# API View for User CRUD Operations
class UserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id=None):
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                user_data = {
                    "user_id": user.user_id,
                    "username": user.username,
                    "full_name": user.full_name,
                    "mobile_number": user.mobile_number,
                    "email": user.email,
                    "role": user.role
                }
                return Response(user_data)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        users = User.objects.all()
        users_data = [
            {
                "user_id": user.user_id,
                "username": user.username,
                "full_name": user.full_name,
                "mobile_number": user.mobile_number,
                "email": user.email,
                "role": user.role
            }
            for user in users
        ]
        return Response(users_data)

    def post(self, request):
        try:
            user_data = request.data
            user = User.objects.create(
                username=user_data["username"],
                password=user_data["password"],
                full_name=user_data["full_name"],
                mobile_number=user_data["mobile_number"],
                email=user_data["email"],
                role=user_data["role"]
            )
            return Response({
                "message": "User created successfully",
                "user_id": user.user_id
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            return Response({"error": f"Missing field: {e}"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user_data = request.data
            user.username = user_data.get("username", user.username)
            user.password = user_data.get("password", user.password)
            user.full_name = user_data.get("full_name", user.full_name)
            user.mobile_number = user_data.get("mobile_number", user.mobile_number)
            user.email = user_data.get("email", user.email)
            user.role = user_data.get("role", user.role)
            user.save()
            return Response({
                "message": "User updated successfully",
                "user_id": user.user_id
            })
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

# API View for ParkingPlace CRUD Operations
class ParkingPlaceView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, place_id=None):
        if place_id:
            try:
                place = ParkingPlace.objects.get(id=place_id)
                place_data = {
                    "place_id": place.place_id,
                    "place_name": place.place_name,
                    "location": place.location,
                    "capacity": place.capacity,
                    "status": place.status
                }
                return Response(place_data)
            except ParkingPlace.DoesNotExist:
                return Response({"error": "Parking place not found"}, status=status.HTTP_404_NOT_FOUND)
        places = ParkingPlace.objects.all()
        places_data = [
            {
                "place_id": place.place_id,
                "place_name": place.place_name,
                "location": place.location,
                "capacity": place.capacity,
                "status": place.status
            }
            for place in places
        ]
        return Response(places_data)

    def post(self, request):
        try:
            place_data = request.data
            place = ParkingPlace.objects.create(
                place_name=place_data["place_name"],
                location=place_data["location"],
                capacity=place_data["capacity"],
                status=place_data["status"]
            )
            return Response({
                "message": "Parking place created successfully",
                "place_id": place.place_id
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            return Response({"error": f"Missing field: {e}"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, place_id):
        try:
            place = ParkingPlace.objects.get(id=place_id)
            place_data = request.data
            place.place_name = place_data.get("place_name", place.place_name)
            place.location = place_data.get("location", place.location)
            place.capacity = place_data.get("capacity", place.capacity)
            place.status = place_data.get("status", place.status)
            place.save()
            return Response({
                "message": "Parking place updated successfully",
                "place_id": place.place_id
            })
        except ParkingPlace.DoesNotExist:
            return Response({"error": "Parking place not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, place_id):
        try:
            place = ParkingPlace.objects.get(id=place_id)
            place.delete()
            return Response({"message": "Parking place deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except ParkingPlace.DoesNotExist:
            return Response({"error": "Parking place not found"}, status=status.HTTP_404_NOT_FOUND)

# You can implement similar views for ParkingLot, ParkingDetail, PaymentDetail, LogDetail, and VehicleType.

