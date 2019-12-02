from django.http import JsonResponse

from rowsheet.utils import rdump

def api_test(value=None):

    # Check request had value == "test" and return response.
    if value == "test":
        return JsonResponse({
                "data": ("OK GOT '%s'" % str(value))
            },status=200)
    else:
        return JsonResponse({
                "data": ("BAD GOT '%s'" % str(value))
            },status=400)

def dump_args(**kwargs):
    return JsonResponse(dict(**kwargs), status=200)
