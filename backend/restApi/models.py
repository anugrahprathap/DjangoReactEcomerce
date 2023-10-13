
# Create your models here.
from django.db import models

from django.contrib.auth.models import AbstractUser

# class CustomUser(AbstractUser):
#     # Additional fields

#     class Meta:
#        pass
        



class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products/' ,null=True, blank=True)
    
    stock = models.PositiveIntegerField()
    def get_content_type(self):
        return self.image.content_type

from django.contrib.auth.models import User








class Products(models.Model):
    ProductId = models.CharField(max_length=100,primary_key=True)
    Gender =  models.CharField(max_length=100)
    Category =  models.CharField(max_length=100)
    SubCategory =  models.CharField(max_length=100)
    ProductType =  models.CharField(max_length=100)
    Colour =  models.CharField(max_length=100)
    Usage =  models.CharField(max_length=100)
    ProductTitle =  models.CharField(max_length=100)
    Image =  models.CharField(max_length=100)
    Price = models.IntegerField()



class CartItem(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()


# class Order(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     items = models.ManyToManyField(CartItem)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2)


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE )
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=300)
    state = models.CharField(max_length=300)
    postal_code = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.address_line1}, {self.city}, {self.state}"
    


from django.db import models
from django.contrib.auth.models import User  # Assuming you're using Django's built-in User model


from django.utils import timezone

def calculate_default_date():
    # You can perform custom logic here to calculate the default date
    date = timezone.now() + timezone.timedelta(days=7)
    currentDate = str(date)
   
    return currentDate

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE,default=None)
    items = models.ManyToManyField(Products)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = list
    created_at = models.DateTimeField(default=calculate_default_date())
    updated_at = models.DateTimeField(default=None)
    status = models.CharField(max_length=300,default="pending")

    # You can add more fields as needed, such as order status, total price, etc.
