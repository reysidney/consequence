from django.contrib.gis import admin
from django.contrib.gis.db import models
from django.contrib.auth.admin import UserAdmin
from django.contrib.gis.db.models import Case, Value, When, CharField

from app import inlines

for var in dir(inlines):
    if var.endswith("Inline"):
        globals()[var] = getattr(inlines, var)
del inlines

class UserList(UserAdmin):
    # inlines = [ProfileInline,]
    list_filter = ['is_staff', 'is_active', 'groups']

    def get_queryset(self, request):
       querySet = super(UserAdmin, self).get_queryset(request)
       if not request.user.is_superuser:
           return querySet.filter(is_superuser=False)
       return querySet

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(UserList, self).get_inline_instances(request, obj)

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets

        if request.user.is_superuser:
            perm_fields = ('is_active', 'is_staff', 'is_superuser',
                           'groups', 'user_permissions')
        else:
            perm_fields = ('is_active', 'is_staff', 'groups')

        return [(None, {'fields': ('username', 'password')}),
                (('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
                (('Permissions'), {'fields': perm_fields}),
                (('Important dates'), {'fields': ('last_login', 'date_joined')})]