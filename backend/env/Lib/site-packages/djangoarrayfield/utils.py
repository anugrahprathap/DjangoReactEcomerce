from typing import Any


def is_primitive(obj: Any):
    return not hasattr(obj, "__dict__")
