from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from .utils import PARSE_REQUEST

#-------------------------------------------------------------------------------
# API
#-------------------------------------------------------------------------------

@csrf_exempt
def API(request):
    try:
        REQUEST = PARSE_REQUEST(request)
        return ROUTE_VERSION(REQUEST)
    except Exception as ex:
        return INVALID_API_REQUEST(ex)

def INVALID_API_REQUEST(ex):
    return JsonResponse({
        "error": "Invalid Unparsable Request: " + str(ex),
    },status=400)

#-------------------------------------------------------------------------------
# VERSION
#-------------------------------------------------------------------------------

def ROUTE_VERSION(REQUEST):
    VERSION = REQUEST["VERSION"]
    if VERSION == "v1":
        return ROUTE_USER_GROUP(REQUEST)
    return INVALID_VERSION()

def INVALID_VERSION():
    return JsonResponse({
        "error": "Invalid Request: Unsupported Version.",
    },status=400)

#-------------------------------------------------------------------------------
# USER GROUP 
#-------------------------------------------------------------------------------

def ROUTE_USER_GROUP(REQUEST):
    USER_GROUP = REQUEST["USER_GROUP"]
    if USER_GROUP == "UG_Test":
        return ROUTE_MODULE(REQUEST)
    return INVALID_USER_GROUP()

def INVALID_USER_GROUP():
    return JsonResponse({
        "error": "Invalid Request: Unsupported User Group.",
    },status=400)

#-------------------------------------------------------------------------------
# MODULE
#-------------------------------------------------------------------------------

def ROUTE_MODULE(REQUEST):
    MODULE = REQUEST["MODULE"]
    if MODULE == "M_Test":
        return ROUTE_COMMAND(REQUEST)
    return INVALID_MODULE()

def INVALID_MODULE():
    return JsonResponse({
        "error": "Invalid Request: Unsupported Module.",
    },status=400)

#-------------------------------------------------------------------------------
# COMMAND
#-------------------------------------------------------------------------------

def ROUTE_COMMAND(REQUEST):
    COMMAND = REQUEST["COMMAND"]
    if COMMAND == "C_Test":
        from .api_test import api_test
        return api_test(REQUEST)
    return INVALID_COMMAND()

def INVALID_COMMAND():
    return JsonResponse({
        "error": "Invalid Request: Unsupported Command.",
    },status=400)
