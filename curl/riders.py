import subprocess
import json
from termcolor import colored, cprint

def run_curl(curl):
    # Print the curl request in blue.
    cprint(curl.replace("    ","\n    "), "blue")
    # Print the response in green.
    response = subprocess.check_output(curl, shell=True)
    cprint(json.dumps(
            json.loads(response),
            indent=4,
            sort_keys=True),
        "green")

run_curl("""
# Invalid route.
curl -s localhost:5002/api_test/?value=ValueFromGET\
    -u [DemoUser]: \
""")

run_curl("""
# Invalid version
curl -s localhost:5002/api/v2/api_test/api_test/api_test \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
# Invalid user group
curl -s localhost:5002/api/v1/invalid/api_test/api_test \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
# Invalid module 
curl -s localhost:5002/api/v1/api_test/invalid/api_test \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
# Invalid command
curl -s localhost:5002/api/v1/api_test/api_test/invalid \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
# Missing module
curl -s localhost:5002/api/v1/api_test/missing/api_test \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
# Missing command
curl -s localhost:5002/api/v1/api_test/api_test/missing \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
curl -s localhost:5002/api/v1/api_test/api_test/api_test \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
""")

run_curl("""
curl -s localhost:5002/api/v1/api_test/api_test/dump_args\
    -X POST \
    -u [TOKEN]: \
    -d foo="Foo" \
    -d bar="Bar" \
    -d baz="Bar" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")
