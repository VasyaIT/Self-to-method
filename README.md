# **This extension automatically adds `self` and `cls` as the first argument to methods in Python classes**

## Example:

```python
class SomeClass:
    # 'self' added automatically here
    def some_method(self):
        ...

    @classmethod
    # 'cls' added automatically here
    def some_classmethod(cls):
        ...

    # nothing will be added here.
    def some_staticmethod():
        ...
```
