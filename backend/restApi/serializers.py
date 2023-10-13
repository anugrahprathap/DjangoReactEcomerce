# serializers.py
from rest_framework import serializers
from .models import Products ,CartItem,Order
from rest_framework import generics


from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model  = CartItem
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        

from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'address_line1', 'address_line2', 'city', 'state', 'postal_code')

    def validate(self, data):
        # Manually set the user field before saving
        data['user'] = self.context['request'].user

        return data



class OrderSerializer(serializers.ModelSerializer):
    items = serializers.ListField(
        child=serializers.IntegerField(),  # Assuming item IDs are integers
        required=False
    )
    quantity = serializers.ListField(
        child=serializers.IntegerField(),  # Assuming item IDs are integers
        required=False
    )
    # product = ProductSerializer()

    class Meta:
        model = Order
        fields = ("address",'items' ,'total_price' ,'quantity' ,'created_at','updated_at','status' )

    def validate(self, data):
       
        # Manually set the user field before saving
        data['user'] = self.context['request'].user

        return data

