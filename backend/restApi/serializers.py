# serializers.py
from rest_framework import serializers
from .models import Product,CartItem,Order
from rest_framework import generics

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CartItem
        fields = '__all__'
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        modsel = Order
        fields = '__all__'



