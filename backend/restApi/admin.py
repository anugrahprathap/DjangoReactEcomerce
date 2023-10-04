from django.contrib import admin

from .models import Product,CartItem,Order,Products,Address
# Register your models here.
admin.site.register(Products)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(Address)