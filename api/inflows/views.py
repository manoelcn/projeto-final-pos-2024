from rest_framework import generics
from . import models, serializers


class InflowCreateListAPIView(generics.ListCreateAPIView):
    queryset = models.Inflow.objects.all()
    serializer_class = serializers.InflowSerializer


class InflowRetriveAPIView(generics.RetrieveAPIView):
    queryset = models.Inflow.objects.all()
    serializer_class = serializers.InflowSerializer
