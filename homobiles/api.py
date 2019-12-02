from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from termcolor import cprint

from .request import PARSE_REQUEST
from .status_codes import HTTP

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
    msg = "Invalid Unparsable Request."
    cprint(msg + " " + str(ex), "red")
    return JsonResponse({
        "error": msg,
    }, status = HTTP.BAD_REQUEST )

#-------------------------------------------------------------------------------
# VERSION
#-------------------------------------------------------------------------------

def ROUTE_VERSION(REQUEST):
    VERSION = REQUEST["ROUTE"]["VERSION"]
    if VERSION == "v1":
        return ROUTE_USER_GROUP(REQUEST)
    return UNKNOWN_VERSION()

def UNKNOWN_VERSION():
    return JsonResponse({
        "error": "Invalid Request: Unknown Version.",
    }, status = HTTP.NOT_FOUND )

#-------------------------------------------------------------------------------
# USER GROUP 
#-------------------------------------------------------------------------------

def ROUTE_USER_GROUP(REQUEST):
    USER_GROUP = REQUEST["ROUTE"]["USER_GROUP"]
    if USER_GROUP == "test":
        return ROUTE_MODULE(REQUEST)
    return UNKNOWN_USER_GROUP()

def UNKNOWN_USER_GROUP():
    return JsonResponse({
        "error": "Invalid Request: Unknown User Group.",
    }, status = HTTP.NOT_FOUND )

#-------------------------------------------------------------------------------
# MODULE
#-------------------------------------------------------------------------------

def ROUTE_MODULE(REQUEST):
    MODULE = REQUEST["ROUTE"]["MODULE"]
    if MODULE == "test":
        return ROUTE_COMMAND(REQUEST)
    return UNKNOWN_MODULE()

def UNKNOWN_MODULE():
    return JsonResponse({
        "error": "Invalid Request: Unknown Module.",
    }, status = HTTP.NOT_FOUND )

#-------------------------------------------------------------------------------
# COMMAND
#-------------------------------------------------------------------------------

def ROUTE_COMMAND(REQUEST):
    COMMAND = REQUEST["ROUTE"]["COMMAND"]
    if COMMAND == "test":
        from .api_test import api_test
        return api_test(REQUEST)
    if COMMAND == "dump_request":
        from .api_test import dump_request
        return dump_request(REQUEST)
    return UNKNOWN_COMMAND()

def UNKNOWN_COMMAND():
    return JsonResponse({
        "error": "Invalid Request: Unknown Command.",
    }, status = HTTP.NOT_FOUND )
