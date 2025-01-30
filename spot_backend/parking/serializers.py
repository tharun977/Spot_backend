from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is not exposed in API responses

    class Meta:
        model = User  # This should now refer to your custom model
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


# New RegisterSerializer for User Registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']

    def validate(self, attrs):
        # Check if passwords match
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')  # Remove the confirm password field
        user = User.objects.create_user(**validated_data)  # Create user and hash password
        return user
