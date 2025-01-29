# Generated by Django 5.1.5 on 2025-01-29 06:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ParkingLot',
            fields=[
                ('lot_id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ParkingPlace',
            fields=[
                ('place_id', models.AutoField(primary_key=True, serialize=False)),
                ('place_name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=250)),
                ('capacity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=50)),
                ('full_name', models.CharField(max_length=150)),
                ('contact_number', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleType',
            fields=[
                ('vehicle_type_id', models.AutoField(primary_key=True, serialize=False)),
                ('vehicle_type', models.CharField(max_length=50)),
                ('parking_fee', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
        migrations.CreateModel(
            name='ParkingDetails',
            fields=[
                ('parking_id', models.AutoField(primary_key=True, serialize=False)),
                ('vehicle_reg_no', models.CharField(max_length=50)),
                ('mobile_number', models.CharField(max_length=15)),
                ('in_time', models.DateTimeField()),
                ('out_time', models.DateTimeField(blank=True, null=True)),
                ('payment_status', models.CharField(max_length=50)),
                ('parking_duration', models.DurationField()),
                ('lot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking.parkinglot')),
                ('occupied_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='parking.user')),
                ('vehicle_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking.vehicletype')),
            ],
        ),
        migrations.AddField(
            model_name='parkinglot',
            name='place',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking.parkingplace'),
        ),
        migrations.CreateModel(
            name='PaymentDetails',
            fields=[
                ('payment_id', models.AutoField(primary_key=True, serialize=False)),
                ('payment_method', models.CharField(max_length=50)),
                ('payment_date', models.DateTimeField()),
                ('parking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking.parkingdetails')),
            ],
        ),
        migrations.CreateModel(
            name='LogDetails',
            fields=[
                ('log_id', models.AutoField(primary_key=True, serialize=False)),
                ('status_before', models.CharField(max_length=50)),
                ('status_after', models.CharField(max_length=50)),
                ('timestamp', models.DateTimeField()),
                ('lot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking.parkinglot')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking.user')),
            ],
        ),
        migrations.AddField(
            model_name='parkinglot',
            name='vehicle_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parking.vehicletype'),
        ),
    ]
