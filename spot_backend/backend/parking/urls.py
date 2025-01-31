from django.urls import path
from . import views

urlpatterns = [
    # Home and Logout views
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

    # User CRUD operations
    path('users/', views.UserView.as_view(), name='user-list'),  # List all users or create a new user
    path('users/<int:user_id>/', views.UserView.as_view(), name='user-detail'),  # Get, update, or delete a specific user

    # ParkingPlace CRUD operations
    path('parking-places/', views.ParkingPlaceView.as_view(), name='parking-place-list'),  # List all parking places or create a new place
    path('parking-places/<int:place_id>/', views.ParkingPlaceView.as_view(), name='parking-place-detail'),  # Get, update, or delete a specific parking place

    # You can add more URLs for ParkingLot, ParkingDetail, PaymentDetail, LogDetail, VehicleType following the same pattern
]
