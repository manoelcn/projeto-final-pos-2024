from rest_framework import generics, status
from . import models, serializers
from django.db.models import ProtectedError
from rest_framework.response import Response


class CategoryCreateListAPIView(generics.ListCreateAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class CategoryRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
            return Response({"message": "Categoria deletada com sucesso!"}, status=status.HTTP_204_NO_CONTENT)
        except ProtectedError as e:
            return Response({"error": "Esta categoria não pode ser excluída."}, status=status.HTTP_400_BAD_REQUEST)
