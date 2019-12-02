import base64
import json
from termcolor import cprint

#-------------------------------------------------------------------------------
# Request has four parts:
#   1) Route
#   2) Args
#   3) Authorization
#-------------------------------------------------------------------------------
def PARSE_REQUEST(request):
    REQUEST = {}

    try:
        REQUEST["ROUTE"] = parse_REQUEST_ROUTE(request)
    except Exception as ex:
        msg = "Unparsable Route: "
        cprint(msg + str(ex), "red")
        raise Exception(msg)

    try:
        REQUEST["ARGS"] = parse_HTTP_ARGS(request)
    except Exception as ex:
        msg = "Unparsable Args:"
        cprint(msg + str(ex), "red")
        raise Exception(msg)

    try:
        REQUEST["AUTHORIZATION"] = parse_HTTP_AUTHORIZATION(request)
    except Exception as ex:
        msg = "Unparsable Authorization:"
        cprint(msg + str(ex), "red")
        raise Exception(msg)

    return REQUEST

#-------------------------------------------------------------------------------
# Parse the Request Route:
#   1) VERSION
#   2) USER_GROUP
#   3) MODULE
#   4) COMMAND
#   5) METHOD (GET or POST)
#-------------------------------------------------------------------------------
def parse_REQUEST_ROUTE(request):
    url = request.path.strip("/")
    path  = url.split("/")
    if len(path) < 5:
        raise Exception("Invalid request route.")
    VERSION = path[1]
    USER_GROUP = path[2]
    MODULE = path[3]
    COMMAND = path[4]
    METHOD = request.method
    return {
        "VERSION": VERSION,
        "USER_GROUP": USER_GROUP,
        "MODULE": MODULE,
        "COMMAND": COMMAND,
        "METHOD": METHOD,
    }

#-------------------------------------------------------------------------------
# A less shitty way of parsing the standard fucking HTTP_AUTHORIZATION header.
# Thanks for the bullshit, Django!
#-------------------------------------------------------------------------------
def parse_HTTP_AUTHORIZATION(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header is None:
        return {
            "AUTHORIZATION": False,
            "USERNAME": None,
            "PASSWORD": None,
        }
    # Remove "Basic " to isolate credentials.
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8").split(':')
    # Remove the square brackets around username.
    username = decoded_credentials[0][1:-1]
    password = decoded_credentials[1]
    return {
        "AUTHORIZATION": True,
        "USERNAME": username,
        "PASSWORD": password,
    }

#-------------------------------------------------------------------------------
# A less shitty way of parsing simple fucking arguments from common wasy:
#
#   1) JSON     encoded     POST
#   2) FORM     encoded     POST
#   3) URL      encoded     GET
#
# Thanks for the bullshit, Django!
#-------------------------------------------------------------------------------
def parse_HTTP_ARGS(request):
    args = {}
    if request.content_type == "application/json":
        args = json.loads(request.body.decode('utf-8'))
    if request.content_type == "application/x-www-form-urlencoded":
        if request.method == "POST":
            args = { key : val for key, val in request.POST.items()}
    if request.content_type == "text/plain":
        if request.method == "GET":
            args = { key : val for key, val in request.GET.items()}
    return args
