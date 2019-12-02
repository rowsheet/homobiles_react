from django.http import JsonResponse

from termcolor import cprint

from .status_codes import HTTP

#---------------------------------------
# INTERNAL_SERVER_ERROR: 500
#---------------------------------------

def HandleMissingCommand(request=None, error=None):
    msg = "This command is currently unavailible."
    ex = None
    if error is not None:
        ex = error.get("exception")
    cprint(msg + " " + str(ex), "red")
    return JsonResponse({
        "error": msg,
    }, status = HTTP.SERVICE_UNAVAILABLE)

def HandleMissingModule(request=None, error=None):
    msg = "This module is currently unavailible."
    ex = None
    if error is not None:
        ex = error.get("exception")
    cprint(msg + " " + str(ex), "red")
    return JsonResponse({
        "error": msg,
    }, status = HTTP.SERVICE_UNAVAILABLE)

#---------------------------------------
# BAD_REQUEST: 400
#---------------------------------------

def HandleInvalidRequest(request=None, error=None):
    msg = "Invalid Unparsable Request."
    ex = None
    if error is not None:
        ex = error.get("exception")
    cprint(msg + " " + str(ex), "red")
    return JsonResponse({
        "error": msg,
    }, status = HTTP.BAD_REQUEST )

def HandleInvalidVersion(request=None, error=None):
    msg = "Unsported API Version."
    cprint(msg)
    return JsonResponse({
        "error": msg,
    }, status = HTTP.BAD_REQUEST )

#---------------------------------------
# NOT_IMPLEMENTED: 501
#---------------------------------------

def HandleNotImplemented(request=None, error=None):
    msg = "Sorry! %s.%s.%s is callable but hasn't been implemented." % (
        request.route.user_group,
        request.route.module,
        request.route.command,
    )
    cprint(msg)
    return JsonResponse({
        "error": msg,
    }, status = HTTP.NOT_IMPLEMNTED)

#---------------------------------------
# NOT_FOUND: 404
#---------------------------------------

def Handle404(request=None, error=None):
    return JsonResponse({
        "error": "Service not found.",
    }, status = HTTP.NOT_FOUND )

def HandleUnknownUserGroup(request=None, error=None):
    msg = "Unknown User Group."
    cprint(msg, "red")
    return JsonResponse({
        "error": msg,
    }, status = HTTP.NOT_FOUND)

def HandleUnknownModule(request=None, error=None):
    msg = "Unknown Module."
    cprint(msg, "red")
    return JsonResponse({
        "error": msg,
    }, status = HTTP.NOT_FOUND)

def HandleUnknownCommand(request=None, error=None):
    msg = "Unknown Command."
    cprint(msg, "red")
    return JsonResponse({
        "error": msg,
    }, status = HTTP.NOT_FOUND)
