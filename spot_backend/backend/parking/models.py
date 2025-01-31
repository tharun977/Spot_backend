from django.db import models

# User model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50)

    def __str__(self):
        return self.username


# Parking Place model
class ParkingPlace(models.Model):
    place_id = models.AutoField(primary_key=True)
    place_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    capacity = models.IntegerField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.place_name


# Parking Lot model
class ParkingLot(models.Model):
    lot_id = models.AutoField(primary_key=True)
    parking = models.ForeignKey(ParkingPlace, related_name="parking_lots", on_delete=models.CASCADE)
    status_before = models.CharField(max_length=50)
    status_after = models.CharField(max_length=50)

    def __str__(self):
        return f"Lot {self.lot_id} in {self.parking.place_name}"


# Parking Details model
class ParkingDetail(models.Model):
    parking_id = models.AutoField(primary_key=True)
    place = models.ForeignKey(ParkingPlace, related_name="parking_details", on_delete=models.CASCADE)
    lot = models.ForeignKey(ParkingLot, related_name="parking_details", on_delete=models.CASCADE)
    vehicle_type = models.ForeignKey('VehicleType', related_name="parking_details", on_delete=models.CASCADE)
    in_time = models.DateTimeField()
    out_time = models.DateTimeField()
    parking_duration = models.DurationField()
    occupied_by = models.ForeignKey(User, related_name="parking_details", on_delete=models.CASCADE)

    def __str__(self):
        return f"Parking {self.parking_id} for {self.occupied_by.username}"


# Payment Details model
class PaymentDetail(models.Model):
    payment_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name="payments", on_delete=models.CASCADE)
    parking = models.ForeignKey(ParkingDetail, related_name="payments", on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    payment_date = models.DateTimeField()
    payment_status = models.CharField(max_length=50)

    def __str__(self):
        return f"Payment {self.payment_id} for {self.parking}"


# Log Details model
class LogDetail(models.Model):
    log_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name="logs", on_delete=models.CASCADE)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"Log {self.log_id} for {self.user.username}"


# Vehicle Type model
class VehicleType(models.Model):
    vehicle_type_id = models.AutoField(primary_key=True)
    vehicle_reg_no = models.CharField(max_length=50, unique=True)
    vehicle_type = models.CharField(max_length=50)

    def __str__(self):
        return self.vehicle_type
