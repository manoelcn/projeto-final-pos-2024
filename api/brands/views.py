from rest_framework import generics, status
from . import models, serializers
from django.db.models import ProtectedError
from rest_framework.response import Response


class BrandCreateListAPIView(generics.ListCreateAPIView):
    queryset = models.Brand.objects.all()
    serializer_class = serializers.BrandSerializer


class BrandRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Brand.objects.all()
    serializer_class = serializers.BrandSerializer

    def delete(self, request, *args, **kwargs):
            instance = self.get_object()
            try:
                self.perform_destroy(instance)
                return Response({"message": "Marca deletada com sucesso!"}, status=status.HTTP_204_NO_CONTENT)
            except ProtectedError as e:
                return Response(
                    {
                        "error": "Esta marca não pode ser excluída."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

    def perform_destroy(self, instance):
            instance.delete()