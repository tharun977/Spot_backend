from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    full_name = models.CharField(max_length=150)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class VehicleType(models.Model):
    vehicle_type_id = models.AutoField(primary_key=True)
    vehicle_type = models.CharField(max_length=50)
    parking_fee = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.vehicle_type

class ParkingPlace(models.Model):
    place_id = models.AutoField(primary_key=True)
    place_name = models.CharField(max_length=100)
    location = models.CharField(max_length=250)
    capacity = models.IntegerField()

    def __str__(self):
        return self.place_name

class ParkingLot(models.Model):
    lot_id = models.AutoField(primary_key=True)
    place = models.ForeignKey(ParkingPlace, on_delete=models.CASCADE)
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"Lot {self.lot_id} in {self.place.place_name}"

class ParkingDetails(models.Model):
    parking_id = models.AutoField(primary_key=True)
    lot = models.ForeignKey(ParkingLot, on_delete=models.CASCADE)
    vehicle_reg_no = models.CharField(max_length=50)
    mobile_number = models.CharField(max_length=15)
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE)
    in_time = models.DateTimeField()
    out_time = models.DateTimeField(null=True, blank=True)
    payment_status = models.CharField(max_length=50)
    parking_duration = models.DurationField()
    occupied_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Parking {self.parking_id}"

class PaymentDetails(models.Model):
    payment_id = models.AutoField(primary_key=True)
    parking = models.ForeignKey(ParkingDetails, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50)
    payment_date = models.DateTimeField()

    def __str__(self):
        return f"Payment {self.payment_id}"

class LogDetails(models.Model):
    log_id = models.AutoField(primary_key=True)
    lot = models.ForeignKey(ParkingLot, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status_before = models.CharField(max_length=50)
    status_after = models.CharField(max_length=50)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"Log {self.log_id}"
