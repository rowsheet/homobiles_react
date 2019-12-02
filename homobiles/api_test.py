from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

#-------------------------------------------------------------------------------
# Simply tests weather input value == 'test'.
#-------------------------------------------------------------------------------
@csrf_exempt
def api_test(REQUEST):

    value = REQUEST["ARGS"].get("value")

    # Check request had value == "test" and return response.
    if value == "test":
        return JsonResponse({
                "data": ("OK GOT '%s'" % str(value))
            },status=200)
    else:
        return JsonResponse({
                "data": ("BAD GOT '%s'" % str(value))
            },status=400)

@csrf_exempt
def dump_request(REQUEST):
    return JsonResponse(REQUEST, status=200)
