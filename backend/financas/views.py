from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Categoria, Transacao
from .serializers import CategoriaSerializer, TransacaoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from datetime import date


class CategoriaViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Categoria.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class TransacaoViewSet(viewsets.ModelViewSet):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transacao.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class ResumoFinanceiroView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user

        mes = request.query_params.get('mes')
        ano = request.query_params.get('ano')

        filtros = {'usuario': usuario}

        if mes:
            filtros['data__month'] = mes
        if ano:
            filtros['data__year'] = ano

        receitas = Transacao.objects.filter(
            tipo='R', **filtros
        ).aggregate(total=Sum('valor'))['total'] or 0

        despesas = Transacao.objects.filter(
            tipo='D', **filtros
        ).aggregate(total=Sum('valor'))['total'] or 0

        saldo = receitas - despesas

        return Response({
            'receitas': receitas,
            'despesas': despesas,
            'saldo': saldo
        })