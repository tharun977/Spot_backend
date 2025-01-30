from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone

# Custom User Model (Extends Django's built-in User)
class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='user')
    contact_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)  # Ensure this is unique

    groups = models.ManyToManyField(Group, related_name="parking_users", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="parking_user_permissions", blank=True)

    USERNAME_FIELD = 'email'  # Make sure email is used for login
    REQUIRED_FIELDS = ['username']  # Ensure the username is required as an additional field

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class VehicleType(models.Model):
    vehicle_type = models.CharField(max_length=50, unique=True)
    parking_fee = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.vehicle_type

    class Meta:
        verbose_name = 'Vehicle Type'
        verbose_name_plural = 'Vehicle Types'


class ParkingPlace(models.Model):
    place_name = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=250)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.place_name

    class Meta:
        verbose_name = 'Parking Place'
        verbose_name_plural = 'Parking Places'


class ParkingLot(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('reserved', 'Reserved'),
    ]
    place = models.ForeignKey(ParkingPlace, on_delete=models.CASCADE, related_name="lots")
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='available')

    def __str__(self):
        return f"Lot {self.id} in {self.place.place_name}"

    class Meta:
        verbose_name = 'Parking Lot'
        verbose_name_plural = 'Parking Lots'


class ParkingDetails(models.Model):
    lot = models.ForeignKey(ParkingLot, on_delete=models.CASCADE, related_name="parkings")
    vehicle_reg_no = models.CharField(max_length=50, unique=True)
    mobile_number = models.CharField(max_length=15)
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE)
    in_time = models.DateTimeField(default=timezone.now)
    out_time = models.DateTimeField(null=True, blank=True)
    payment_status = models.BooleanField(default=False)
    occupied_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    @property
    def parking_duration(self):
        if self.out_time:
            return self.out_time - self.in_time
        return None

    def __str__(self):
        return f"Parking {self.id} for {self.vehicle_reg_no}"

    class Meta:
        verbose_name = 'Parking Detail'
        verbose_name_plural = 'Parking Details'


class PaymentDetails(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('card', 'Card'),
        ('online', 'Online'),
    ]
    parking = models.OneToOneField(ParkingDetails, on_delete=models.CASCADE, related_name="payment")
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES)
    payment_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Payment {self.id} - {self.parking.vehicle_reg_no}"

    class Meta:
        verbose_name = 'Payment Detail'
        verbose_name_plural = 'Payment Details'


class LogDetails(models.Model):
    id = models.AutoField(primary_key=True)  # Explicitly defining the primary key
    lot = models.ForeignKey(ParkingLot, on_delete=models.CASCADE, related_name="logs")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="logs")
    status_before = models.CharField(max_length=50)
    status_after = models.CharField(max_length=50)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Log {self.id} - {self.lot} by {self.user.username}"

    class Meta:
        verbose_name = 'Log Detail'
        verbose_name_plural = 'Log Details'
