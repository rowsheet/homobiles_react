import json
from termcolor import cprint

def func(_lambda, *args):
    return _lambda(*args)

def PARSE_CONFIG(config):
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
            "command": " ".join(token[3:]).split("(")[0],
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
            filter(lambda line: (len(line) != 0 and len(line.replace(" ","")) != 0),
                # Split by new lines.
                config.split("\n")))]
    ]

if __name__ == "__main__":
    # Unit Tests
    config = """
POST    Error               [rider]:session     report_a_lost_item(str message)
GET     page                None                load_about_us_page()
POST    Error               [rider]:session     register_account_payment_method_paypal(...?)
POST    Error               [rider]:session     register_account_payment_method_credit_card(int credit_card_number, int exp_month, int exp_year, int zip_code, int cvv)
    """
    CONFIG = PARSE_CONFIG(config)
    cprint(config, "blue")
    cprint(json.dumps(CONFIG,indent=4,sort_keys=True),"green")
