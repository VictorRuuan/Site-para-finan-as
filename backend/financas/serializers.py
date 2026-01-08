from rest_framework import serializers
from .models import Categoria, Transacao

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class TransacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacao
        ordering = ['-data']
        fields = '__all__'
