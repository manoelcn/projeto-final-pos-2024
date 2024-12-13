from django.urls import path
from . import views


urlpatterns = [
    path('api/v1/suppliers/', views.SupplierCreateListAPIView.as_view(), name='supplier-create-list-api'),
    path('api/v1/suppliers/<int:pk>/', views.SupplierRetriveUpdateDestroyAPIView.as_view(), name='supplier-detail-api'),
]
