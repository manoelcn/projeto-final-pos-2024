from django.urls import path
from . import views


urlpatterns = [
    path('api/v1/brands/', views.BrandCreateListAPIView.as_view(), name='brand-create-list-api'),
    path('api/v1/brands/<int:pk>/', views.BrandRetriveUpdateDestroyAPIView.as_view(), name='brand-detail-api')
]
