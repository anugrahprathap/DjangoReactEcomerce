# Generated by Django 4.2.5 on 2023-09-14 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restApi', '0002_product_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='stock',
            field=models.PositiveIntegerField(),
        ),
    ]
