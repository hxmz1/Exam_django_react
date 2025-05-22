import graphene
from graphene_django.types import DjangoObjectType
from .models import Post, UserProfile

class PostType(DjangoObjectType):
    class Meta:
        model = Post

class Query(graphene.ObjectType):
    all_posts = graphene.List(PostType)

    def resolve_all_posts(self, info):
        return Post.objects.all()

schema = graphene.Schema(query=Query)
