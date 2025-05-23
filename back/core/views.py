from rest_framework import viewsets, permissions
from .models import Post, UserProfile
from .serializers import PostSerializer
#from .tasks import send_post_created_email


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # Compare UserProfile avec obj.author
        return obj.author == getattr(request.user, 'userprofile', None)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def get_queryset(self):
        # Filtrer les posts de l'utilisateur courant
        user_profile = getattr(self.request.user, 'userprofile', None)
        return Post.objects.filter(author=user_profile)

    def perform_create(self, serializer):
     user = self.request.user
     user_profile = getattr(user, 'userprofile', None)  # pour gérer le cas où le profil n'existe pas
     post = serializer.save(author=user_profile)  # ou `user_profile=user_profile` selon ton modèle

     #if user.email:
        # Appel de la tâche asynchrone
       # send_post_created_email.delay(user.email, post.title)
        
