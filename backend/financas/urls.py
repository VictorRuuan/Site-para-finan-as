from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet,
    TransacaoViewSet,
    ResumoFinanceiroView
)

router = DefaultRouter()
router.register('categorias', CategoriaViewSet, basename='categoria')
router.register('transacoes', TransacaoViewSet, basename='transacao')

urlpatterns = [
    path('resumo/', ResumoFinanceiroView.as_view()),
]

urlpatterns += router.urls
