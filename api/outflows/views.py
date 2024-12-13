from rest_framework import generics
from . import models, serializers


class OutflowCreateListAPIView(generics.ListCreateAPIView):
    queryset = models.Outflow.objects.all()
    serializer_class = serializers.OutflowSerializer


class OutflowRetriveAPIView(generics.RetrieveAPIView):
    queryset = models.Outflow.objects.all()
    serializer_class = serializers.OutflowSerializer
