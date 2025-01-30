from rest_framework import serializers
from .models import User, VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is not exposed in API responses

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

class VehicleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleType
        fields = '__all__'

class ParkingPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingPlace
        fields = '__all__'

class ParkingLotSerializer(serializers.ModelSerializer):
    place = serializers.StringRelatedField()  # Display place name instead of ID
    vehicle_type = serializers.StringRelatedField()  # Display vehicle type name

    class Meta:
        model = ParkingLot
        fields = '__all__'

class ParkingDetailsSerializer(serializers.ModelSerializer):
    lot = serializers.StringRelatedField()
    vehicle_type = serializers.StringRelatedField()
    occupied_by = serializers.StringRelatedField()

    class Meta:
        model = ParkingDetails
        fields = '__all__'

class PaymentDetailsSerializer(serializers.ModelSerializer):
    parking = serializers.StringRelatedField()  # Display parking details instead of ID

    class Meta:
        model = PaymentDetails
        fields = '__all__'

class LogDetailsSerializer(serializers.ModelSerializer):
    lot = serializers.StringRelatedField()
    user = serializers.StringRelatedField()

    class Meta:
        model = LogDetails
        fields = '__all__'
