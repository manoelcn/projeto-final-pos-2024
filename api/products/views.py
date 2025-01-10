from rest_framework import generics, status
from . import models, serializers
from django.db.models import ProtectedError
from rest_framework.response import Response


class ProductCreateListAPIView(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
            return Response({"message": "Produto deleto com sucesso!"}, staus=status.HTTP_204_NO_CONTENT)
        except ProtectedError as e:
            return Response({"error": "Este produto não pode ser excluído."}, status=status.HTTP_400_BAD_REQUEST)
