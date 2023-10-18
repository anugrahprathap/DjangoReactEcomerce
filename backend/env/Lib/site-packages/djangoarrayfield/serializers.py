from django.utils.deconstruct import deconstructible
import json
from typing import Callable, Generic, List, Union, TYPE_CHECKING

from .generics import TypeT
from .utils import is_primitive


class DjangoArrayEncoder(Generic[TypeT], json.JSONEncoder):
    """
        Generic array decoder for Django, built on top of json.JSONDecoder
    """
    def __init__(self, *args, **kwargs):
        super().__init__()

    def __call__(self, *args, **kwargs):
        return self

    def default(self, o: TypeT) -> Union[str, dict]:
        """
            Returns serializable representation of TypeT array member
        """
        try:
            if is_primitive(o):
                ret: str = o.__str__()
            else:
                ret: dict = o.__dict__()
        # Let the base throw the error ~https://docs.python.org/3/library/json.html#json.JSONEncoder
        except TypeError:
            pass
        else:
            return ret
        return json.JSONEncoder.default(self, o)


class DjangoArrayDecoder(Generic[TypeT], json.JSONDecoder):
    """
        Generic array decoder for Django, built on top of json.JSONEncoder
    """

    def __init__(self, *args, **kwargs):
        self._type = TypeT
        super().__init__(*args, **kwargs)

    def __dict__(self):
        return vars(self)

    def __call__(self, *args, **kwargs):
        return self

    def __eq__(self, o):
        """To prevent a new migration from being created each time makemigrations is run,
        you should also add a __eq__() method to the decorated class.
        This function will be called by Django’s migration framework to detect changes between states."""
        if type(self) == type(o):
            return True
        else:
            return False

    def decode(self, s: str, _w: Callable[..., TypeT] = ...) -> List[TypeT]:
        # method's signature differs from docs: https://docs.python.org/3/library/json.html,
        # TODO figure out what _w does
        ret: List[TypeT] = []
        try:
            json_obj = json.loads(s)
            if hasattr(self._type, "__new__"):
                ret = [o for o in json_obj]
            else:
                ret = [self._type.__init__(**o) for o in json_obj]

        except TypeError:
            json.JSONDecoder.decode(self, s)
        return ret