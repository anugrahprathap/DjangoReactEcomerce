# Generated by Django 4.2.5 on 2023-09-20 20:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restApi', '0005_customuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='items',
        ),
        migrations.RemoveField(
            model_name='order',
            name='user',
        ),
        migrations.DeleteModel(
            name='CartItem',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
    ]
