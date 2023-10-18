from django.db.models import JSONField
from django.db.models.fields import Empty
from typing import Generic

from .generics import TypeT
from .serializers import DjangoArrayDecoder, DjangoArrayEncoder


class GenericEmpty(Generic[TypeT], Empty):
    pass


class DjangoArrayField(Generic[TypeT], JSONField):
    def __init__(self, *args,
                 decoder: DjangoArrayDecoder[TypeT] = DjangoArrayDecoder,
                 encoder: DjangoArrayEncoder[TypeT] = DjangoArrayEncoder,
                 **kwargs):
        self.array_field: JSONField = JSONField(encoder=encoder, decoder=decoder)
        super().__init__(*args, encoder=encoder, decoder=decoder, **kwargs)

    def __copy__(self):
        obj = GenericEmpty()
        obj.__class__ = self.__class__
        obj.__dict__ = self.__dict__.copy()
        return obj
