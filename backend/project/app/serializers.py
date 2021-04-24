from django.contrib.auth.models import User, Group
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer(required=True)
    groups = GroupSerializer(many=True)
    class Meta:
        model = User
        fields = ('is_staff', 'first_name', 'last_name', 'username', 'profile', 'groups',)