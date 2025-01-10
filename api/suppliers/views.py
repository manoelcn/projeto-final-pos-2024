from rest_framework import generics, status
from . import models, serializers
from django.db.models import ProtectedError
from rest_framework.response import Response


class SupplierCreateListAPIView(generics.ListCreateAPIView):
    queryset = models.Supplier.objects.all()
    serializer_class = serializers.SupplierSerializer


class SupplierRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Supplier.objects.all()
    serializer_class = serializers.SupplierSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
            return Response({"message": "Fornecedor deletado com sucesso!"}, status=status.HTTP_204_NO_CONTENT)
        except ProtectedError as e:
            return Response({"error": "Este fornecedor não pode ser excluído."}, status=status.HTTP_400_BAD_REQUEST)
