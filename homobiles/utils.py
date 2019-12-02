#-------------------------------------------------------------------------------
# Recursivly dump an object to a dict with all attributes.
#-------------------------------------------------------------------------------
def rdump(obj):
    try:
        if obj is None:
            return None
        if type(obj) in [str, int, bool, float]:
            return obj
        if type(obj) == list:
            return [rdump(item) for item in obj]
        if type(obj) == dict:
            return {key: rdump(val) for key, val in obj.items()}
        return {key: rdump(val) for key, val in obj.__dict__.items()}
    except Exception as ex:
        print(str(ex))
        return "DUMP_PARSE_ERROR"
