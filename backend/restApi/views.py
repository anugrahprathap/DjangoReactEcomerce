from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,status
from .models import Product,CartItem,Order
from .serializers import ProductSerializer,CartItemSerializer,OrderSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from django.conf import settings
User = settings.AUTH_USER_MODEL
from django.db import models
from .models import Products

import io
from django.shortcuts import get_object_or_404

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import CartItem, Products
from rest_framework.generics import UpdateAPIView
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
# Open an image file


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['Category', 'Price']  # Define filter fields
    search_fields = ['ProductTitle']  # Enable searching by ProductTitle
    @action(detail=False, methods=['get'])
    def search(self, request):
        # Get the search query from the request parameters\
        
        query = request.query_params.get('query')
      
        # Perform the search operation using the search filter
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(ProductTitle__icontains=query)
        
        
        # Serialize the search results
        serializer = self.get_serializer(queryset, many=True)
        
        return Response(serializer.data)
    def list(self, request):
        catogary = request.query_params.get('category')
        
        # products = self.filter_queryset(self.get_queryset())
        product = products = self.filter_queryset(self.get_queryset()).filter(ProductType=catogary)

        print(catogary,"*"*90)
        product_data_list = []
        count = 0
        for product in products:
            count = count+1
            serializer = ProductSerializer(product)
            # print(serializer.data)

            

            product_data_list.append(serializer.data)
            if(count>10):
                break

        return Response(product_data_list)
    

# @csrf_exempt
class ProductDetailViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        try:
            
            product = Products.objects.get(ProductId=pk)
            
        except Products.DoesNotExist:
            return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product)


        return Response(serializer.data)
class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    



from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

# @method_decorator(login_required, name='dispatch')
# @action(detail=False, methods=['POST'])
class AddToCartView(viewsets.ViewSet):
    
    # authentication_classes = [JWTAuthentication]  # Add JWT authentication here
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer
    @action(detail=False, methods=['POST'])
    def add_to_cart(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        product = get_object_or_404(Products, pk=product_id)
        print('*'*54,product)
        # Create or update the cart item
        
        cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product,quantity=quantity)
        # cart_item.quantity += int(quantity)
        cart_item.save()
        return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['GET'])
    def get_queryset(self,request):
        user = self.request.user
        
        cartItem= CartItem.objects.filter(user=user).prefetch_related('product')
        serializer = CartItemSerializer(cartItem, many=True)
        # serlizer = CartItemSerializer(cartItem)
        return Response(serializer.data)
    @action(detail=False, methods=['DELETE'])
    def remove_from_cart(self, request):
        
        id = request.data.get('id')

        # Get the cart item associated with the user and product
        cart_item = CartItem.objects.filter(user=request.user, id=id).first()

        if cart_item:
            # Remove the cart item from the database
            cart_item.delete()
            return Response({'message': 'Item removed from cart successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
    



from rest_framework import viewsets
from .models import Address
from .serializers import AddressSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action

from rest_framework import status

class AddressViewSet(ModelViewSet):

   
    serializer_class = AddressSerializer  
    
    
    def get_queryset(self):
        # Get the user associated with the request
        user = self.request.user

        # Filter addresses based on the user
        queryset = Address.objects.filter(user=user)
        return queryset
    @action(detail=False, methods=['post'])
    def create_address(self, request):
        # Obtain the user instance associated with the request
        user = request.user
        
        # Create a serializer instance with the request data
        
        serializer = self.get_serializer(data=request.data)
        
        
        # Validate the serializer
        serializer.is_valid(raise_exception=True)

        # Save the address
        serializer.save()

        return Response({'message': 'Address created successfully', 'address': serializer.data}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['put'])
    def edit_address(self, request, pk=None):
        # Get the address instance to be edited
        address = self.get_object()

        # Create a serializer instance with the request data and the existing address instance
        serializer = self.get_serializer(address, data=request.data, partial=True)

        # Validate the serializer
        serializer.is_valid(raise_exception=True)

        # Save the edited address
        serializer.save()
        return Response({'message': 'Address edited successfully', 'address': serializer.data}, status=status.HTTP_200_OK)
    





# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer









from rest_framework.views import APIView
from .models import Order
from .serializers import OrderSerializer 
from rest_framework import status as sts
from django.db.models import Q
class OrderCreateView(ModelViewSet):
    queryset = Order.objects.all()
    @action(detail=False, methods=['GET'])
    def myOrders(self,request):
        # Get the user associated with the request
        user = self.request.user

        orders = Order.objects.filter(Q(user=user) & ~Q(status='Pending'))

        # Create a list to store the order data with product details
        orders_data = []

        for order in orders:
            # Fetch the product details associated with this order
            product_details = []
            
            items = order.items.all()
            
            if items:  
                for product in items:

                    print(product)
                    product_details.append({
                        'ProductId': product.ProductId,
                        'ProductTitle': product.ProductTitle,
                        'Price': product.Price,
                        'Image': product.Image,
                        'Color':product.Colour
                    })

            # Add order data to the list
            orders_data.append({
                'OrderId': order.id,
                'TotalPrice': order.total_price,
                'Status': order.status,
                'Quantity':order.quantity,
                'OrderDate': order.created_at,
                'ProductDetails': product_details,
            })

        return Response(orders_data)

        # queryset = Order.objects.filter(
        #     Q(user=user) & ~Q(status='Pending')
        # ).prefetch_related('items__product').values(
        #     'id', 'total_price', 'quantity', 'status', 'items__ProductTitle'
        # )
        # print(queryset)
        # orders_data = list(queryset)

        # return JsonResponse(orders_data, safe=False)
        
        
        # return Response(queryset)
    serializer_class = OrderSerializer
    @action(detail=False, methods=['post'])
    def post(self, request):
        # Retrieve the user from the authentication token
        user = request.user

        # Pass the user to the serializer context
        serializer = self.get_serializer(data=request.data)
        # serializer.validate(request.data)
        if not serializer.is_valid():
            print("*" * 56)
            print(serializer.errors)

        if serializer.is_valid():
            address = serializer.validated_data['address']
            total_price = serializer.validated_data['total_price']
            quantity = serializer.validated_data['quantity']
            items = serializer.validated_data['items']
            created_at = calculate_default_date()
            updated_at = calculate_default_date()
            status = "Pending"

            print("*"*87,items, quantity)
            order = Order.objects.create(
                user=user,
                address=address,
                total_price=total_price,
               quantity=quantity,
                status=status,
                created_at = created_at,
                updated_at= updated_at,
            )
            order.items.set(items)
           
            order.save()
            print(order.id)
            response_data = {
                'message': 'Order created successfully',
                'order_id': order.id,
            }

            return Response(response_data, status=sts.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=sts.HTTP_400_BAD_REQUEST)
        


    @action(detail=True, methods=['put'])
    def update_order(self, request, pk=None):
        try:
            # Get the order instance to be updated
            order = self.get_object()

            # Update the order status to 'success'
            order.status = 'success'
            order.save()

            return Response({'message': 'Order status updated successfully'}, status=status.HTTP_200_OK)

        except Order.DoesNotExist:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        



from django.utils import timezone

def calculate_default_date():
    # You can perform custom logic here to calculate the default date
    date = timezone.now() + timezone.timedelta(days=7)
    currentDate = str(date)
    
    return currentDate
