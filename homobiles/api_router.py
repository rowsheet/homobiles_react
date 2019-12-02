from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from termcolor import cprint

from django.conf import settings

from .request import Request
from .status_codes import HTTP

from .api_controller import ParseConfig, LoadAPI
from .api_error_responses import HandleInvalidRequest

api_spec = ParseConfig(settings.API_SPEC)

@csrf_exempt
def Handle(djangoRequest):

    # Parse the request.

    try:
        request = Request(djangoRequest)
    except Exception as ex:
        return HandleInvalidRequest(ex)

    # Validate the request per the API spec and load the return
    # method.

    api_method, error = LoadAPI(request, api_spec)
    if error is not None:
        return api_method(request, error)
    return api_method(**request.args)
