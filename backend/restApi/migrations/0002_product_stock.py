# Generated by Django 4.2.5 on 2023-09-14 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restApi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='stock',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
