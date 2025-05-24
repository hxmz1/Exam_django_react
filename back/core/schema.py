import graphene
from graphene_django import DjangoObjectType
from .models import Post, UserProfile
from django.contrib.auth import get_user_model
import graphql_jwt

User = get_user_model()

# Type GraphQL pour Post
class PostType(DjangoObjectType):
    class Meta:
        model = Post
        fields = ("id", "title", "content", "author", "created_at")

# Type GraphQL pour UserProfile
class UserProfileType(DjangoObjectType):
    class Meta:
        model = UserProfile
        fields = ("id", "user", "email")

# Mutation création de Post avec gestion author et validation UserProfile
class CreatePost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)

    def mutate(self, info, title, content):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication required")

        # Récupérer UserProfile associé à l'utilisateur
        user_profile = getattr(user, "userprofile", None)
        if not user_profile:
            raise Exception("UserProfile not found for the user")

        # Valider longueur contenu (comme MinLengthValidator)
        if len(content) < 10:
            raise Exception("Content must be at least 10 characters long")

        post = Post(title=title, content=content, author=user_profile)
        post.save()
        return CreatePost(post=post)

# Query
class Query(graphene.ObjectType):
    all_posts = graphene.List(PostType)

    def resolve_all_posts(self, info):
        return Post.objects.all()

# Mutations avec JWT intégrées + notre mutation CreatePost
class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()          # login (username/password)
    verify_token = graphql_jwt.Verify.Field()                     # vérifier token
    refresh_token = graphql_jwt.Refresh.Field()                   # rafraîchir token

    create_post = CreatePost.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
