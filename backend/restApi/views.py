from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,status
from .models import Product,CartItem,Order
from .serializers import ProductSerializer,CartItemSerializer,OrderSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
import imghdr
import base64


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# @csrf_exempt
class ProductDetailViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product)
        
        # Check if the product has an image
        if product.image:
            image_data = product.image.read()  # Read the image data
            content_type = imghdr.what(None, h=image_data)
            
            # Include the image data in the response
            image_data_url = f"data:image/{content_type};base64,{base64.b64encode(image_data).decode()}"
            response_data = {
                'product_data': serializer.data,
                'image_data_url': image_data_url,
            }
            return Response(response_data)

        return Response(serializer.data)
class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

