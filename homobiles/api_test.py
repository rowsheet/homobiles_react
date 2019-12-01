#-------------------------------------------------------------------------------
# Simply tests weather input value == 'test'.
#-------------------------------------------------------------------------------
@csrf_exempt
def api_test(request):

    REQUEST = PARSE_REQUEST(request)
    value = REQUEST.ARGS.get("value")

    # Check request had value == "test" and return response.
    if value == "test":
        return JsonResponse({
                "data": ("OK GOT '%s'" % str(value))
            },status=200)
    else:
        return JsonResponse({
                "data": ("BAD GOT '%s'" % str(value))
            },status=400)
