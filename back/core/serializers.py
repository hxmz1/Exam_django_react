from rest_framework import serializers
from .models import Post, UserProfile

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['author', 'created_at']  # Empêche l'utilisateur de forcer l'auteur

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email']  # Personnalisable selon ce que tu veux exposer
