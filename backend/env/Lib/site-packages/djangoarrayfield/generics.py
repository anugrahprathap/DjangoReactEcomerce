from typing import Protocol, TypeVar


class ProtocolT(Protocol):
    def __init__(self, **kwargs):
        self.__dict__().update(kwargs)


TypeT = TypeVar('TypeT', bound=ProtocolT)
