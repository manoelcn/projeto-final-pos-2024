from django.urls import path
from . import views


urlpatterns = [
    path('api/v1/categories/', views.CategoryCreateListAPIView.as_view(), name='category-create-list-api'),
    path('api/v1/categories/<int:pk>/', views.CategoryRetriveUpdateDestroyAPIView.as_view(), name='category-detail-api'),
]
