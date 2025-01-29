from rest_framework import serializers
from .models import User, VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class VehicleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleType
        fields = '__all__'

class ParkingPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingPlace
        fields = '__all__'

class ParkingLotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingLot
        fields = '__all__'

class ParkingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingDetails
        fields = '__all__'

class PaymentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        fields = '__all__'

class LogDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogDetails
        fields = '__all__'
