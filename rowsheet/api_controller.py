from django.http import JsonResponse

import json
from termcolor import cprint
from importlib import import_module

from .api_error_responses import (
    HandleMissingCommand,
    HandleMissingModule,
    HandleUnknownUserGroup,
    HandleUnknownModule,
    HandleInvalidVersion,
    HandleUnknownCommand,
        )

def LoadAPI(request, api_spec):

    # Filter for requests matching version.
    version_set = list(filter(lambda spec:
        spec["route"]["version"] == request.route.version,
        [spec for spec in api_spec]))
    if not version_set: return HandleInvalidVersion, True

    # Filter that for requests matching user group.
    user_set = list(filter(lambda spec:
        spec["route"]["user_group"] == request.route.user_group,
        [spec for spec in version_set]))
    if not user_set: return HandleUnknownUserGroup, True

    # Filter that for requests matching the module.
    module_set = list(filter(lambda spec:
        spec["route"]["module"] == request.route.module,
        [spec for spec in user_set]))
    if not module_set: return HandleUnknownModule, True

    # Filter that for requests matching the command.
    command_set = list(filter(lambda spec:
        spec["route"]["command"] == request.route.command,
        [spec for spec in module_set]))
    if not command_set: return HandleUnknownCommand, True

    # Dynamically load the module from what's specified (this shold
    # be safe since it's from a subset of what's in the API spec.
    try:
        module = import_module("%s.api.%s" % (
                request.route.module, request.route.version))
    except Exception as ex:
        return HandleMissingModule, { "exception": ex }

    # Dynamically load the method that matches the name of the command.
    # This should also be safe for the same reasons.
    try:
        method = getattr(module, request.route.command)
    except Exception as ex:
        return HandleMissingCommand, { "exception": ex }

    # Return the method, passing None as the error parameter.
    return method, None

def ParseConfig(config):

    def func(_lambda, *args):
        return _lambda(*args)

    return [
        func((lambda token: {
            # HTTP method type (GET or POST)
            "method": token[0],
            # Return data type (should be a class or type)
            "return_type": token[1],
            # Authorization in HTTP_AUTHORIZATION header format.
            "auth": func((lambda x: func((lambda x: {
                "user": x[0].strip("["),
                "pass": x[1].strip(":"),
                }), x.split("]"))
                if x.lower() != "none" else None),token[2]),
            # Name of the function.
            "route": func((lambda stub: {
                "version": stub[0],
                "user_group": stub[1],
                "module": stub[2],
                "command": stub[3],
            }), " ".join(token[3:]).split("(")[0].split(".")),
            # Static function declaration (type, name).
            "params": func((lambda params: func((lambda params: [func((lambda x:{
                "type": x[0],
                "name": x[1],
                }), pair.strip(" ").split(" ")) for pair in params ]), params,
                # Return None if no params, not just a zero-length array.
                ) if len(params) > 0 else None ), 
                # Questionmark means not implemented so empty parameters.
                list(filter(lambda x: x != "...?" and x != "",
                " ".join(token[3:]).split("(")[1].replace(")","").split(",")))),
        }),line.split())
        for line in [" ".join(line.split()) for line in list(
            # Remove empty lines and extra spaces so we can tokenize by spaces.
            filter(lambda line: (len(line) != 0 and
                len(line.replace(" ","")) != 0) and
                line.strip(" ")[0:2] != "//",
                # Split by new lines.
                config.split("\n")))]
    ]

if __name__ == "__main__":
    config = """
POST    Error               [rider]:session     v1.rider.admin.report_a_lost_item(str message)
GET     page                None                v1.rider.admin.load_about_us_page()
POST    Error               [rider]:session     v1.rider.admin.register_account_payment_method_paypal(...?)
POST    Error               [rider]:session     v1.rider.admin.register_account_payment_method_credit_card(int credit_card_number, int exp_month, int exp_year, int zip_code, int cvv)
// Comment
    """
    CONFIG = ParseConfig(config)
    cprint(config, "blue")
    cprint(json.dumps(CONFIG,indent=4,sort_keys=True),"green")
