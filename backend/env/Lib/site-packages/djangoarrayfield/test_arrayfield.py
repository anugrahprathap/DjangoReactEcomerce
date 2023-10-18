from django import setup
from django.test import TransactionTestCase
from typing import List, Iterable
from unittest import TestCase


from .models import TestArrayModel, TestObjectType
from .serializers import DjangoArrayEncoder, DjangoArrayDecoder


test_array_int: List[int] = [1, 2]
test_array_str: List[str] = ["a", "b"]
test_array_obj: List[TestObjectType] = [TestObjectType("a", 1), TestObjectType("b", 2)]


class TestSerializer(TransactionTestCase):
    encoder_int: DjangoArrayEncoder[int] = DjangoArrayEncoder[int]()
    encoder_str: DjangoArrayEncoder[str] = DjangoArrayEncoder[str]()
    encoder_obj: DjangoArrayEncoder[TestObjectType] = DjangoArrayEncoder[TestObjectType]()

    decoder_int: DjangoArrayDecoder[int] = DjangoArrayDecoder[int]()
    decoder_str: DjangoArrayDecoder[str] = DjangoArrayDecoder[str]()
    decoder_obj: DjangoArrayDecoder[TestObjectType] = DjangoArrayDecoder[TestObjectType]()

    def test_int_serialization(self):
        self.assertEqual("[1, 2]", self.encoder_int.encode(test_array_int))

    def test_str_serialization(self):
        self.assertEqual('["a", "b"]', self.encoder_str.encode(test_array_str))

    def test_obj_serialization(self):
        self.assertEqual('[{"test_val_1": "a", "test_val_2": 1}, {"test_val_1": "b", "test_val_2": 2}]',
                         self.encoder_obj.encode(test_array_obj))

    def test_int_deserialization(self):
        self.assertEqual(test_array_int, self.decoder_int.decode("[1, 2]"))

    def test_str_deserialization(self):
        self.assertEqual(test_array_str, self.decoder_str.decode('["a", "b"]'))

    def test_obj_deserialization(self):
        self.assertEqual(test_array_obj, self.decoder_obj.decode('[{"test_val_1": "a", "test_val_2": 1}, {"test_val_1": "b", "test_val_2": 2}]'))


class TestArrayField(TestCase):
    def test_int(self):
        obj = TestArrayModel.objects.get(id=1)
        int_val: List[int] = getattr(obj, "test_array_field_int")
        self.assertEqual(test_array_int, int_val)

    def test_str(self):
        obj = TestArrayModel.objects.get(id=1)
        str_val: List[str] = getattr(obj, "test_array_field_str")
        self.assertEqual(test_array_str, str_val)

    def test_obj(self):
        obj = TestArrayModel.objects.get(id=1)
        obj_val: List[TestObjectType] = getattr(obj, "test_array_field_obj")
        self.assertEqual(test_array_obj, obj_val)


    @classmethod
    def setUpClass(cls) -> None:
        setup()
        super(TestArrayField, cls).setUpClass()
        if not isinstance(test_array_obj, Iterable):
            raise TypeError
        test_model_record: TestArrayModel = TestArrayModel.objects.create(test_array_field_str=test_array_str,
                                                                          test_array_field_int=test_array_int,
                                                                          test_array_field_obj=test_array_obj)
        test_model_record.save()


    @classmethod
    def tearDownClass(cls) -> None:
        super(TestArrayField, cls).tearDownClass()
