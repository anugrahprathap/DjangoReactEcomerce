from django.db import models


from .fields import DjangoArrayField
from .generics import ProtocolT

class TestObjectType(ProtocolT):
    """
        Object for testing ArrayField with custom complex type
    """
    def __init__(self, test_val_1: str, test_val_2: int):
        self.test_val_1: str = test_val_1
        self.test_val_2: int = test_val_2
        super().__init__()

    def __eq__(self, other):
        return self.__dict__() == dict(other)

    def __str__(self):
        return f"test_val_1={self.test_val_1}, test_val_2={self.test_val_2}"

    def __dict__(self):
        return {"test_val_1": self.test_val_1, "test_val_2": self.test_val_2}


class TestArrayModel(models.Model):
    test_array_field_str: DjangoArrayField[str] = DjangoArrayField[str](name="test_array_field_str",
                                                                        verbose_name="ArrayField[str] testing field")
    test_array_field_int: DjangoArrayField[int] = DjangoArrayField[int](name="test_array_field_int",
                                                                        verbose_name="ArrayField[int] testing field")
    test_array_field_obj: DjangoArrayField[TestObjectType] = DjangoArrayField[TestObjectType](
        name="test_array_field_obj",
        verbose_name="ArrayField[TestObjectType] testing field")
