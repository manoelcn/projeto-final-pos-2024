from django.urls import path
from . import views


urlpatterns = [
    path('api/v1/inflows/', views.InflowCreateListAPIView.as_view(), name='inflow-create-list-api'),
    path('api/v1/inflows/<int:pk>/', views.InflowRetriveAPIView.as_view(), name='inflow-detail-api'),

]
