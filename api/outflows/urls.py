from django.urls import path
from . import views


urlpatterns = [
    path('api/v1/outflows/', views.OutflowCreateListAPIView.as_view(), name='outflow-create-list-api'),
    path('api/v1/outflows/<int:pk>/', views.OutflowRetriveAPIView.as_view(), name='outflow-detail-api'),
]
