from django.urls import path
from . import views


urlpatterns = [
    path('api/v1/products/', views.ProductCreateListAPIView.as_view(), name='product-create-list-api'),
    path('api/v1/products/<int:pk>/', views.ProductRetriveUpdateDestroyAPIView.as_view(), name='product-detail-api'),
]
