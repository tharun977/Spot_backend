from django.contrib import admin
from .models import User, VehicleType, ParkingPlace, ParkingLot, ParkingDetails, PaymentDetails, LogDetails

admin.site.register(User)
admin.site.register(VehicleType)
admin.site.register(ParkingPlace)
admin.site.register(ParkingLot)
admin.site.register(ParkingDetails)
admin.site.register(PaymentDetails)
admin.site.register(LogDetails)
