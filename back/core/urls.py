from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet
from graphene_django.views import GraphQLView  

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('graphql/', GraphQLView.as_view(graphiql=True)),  
]
