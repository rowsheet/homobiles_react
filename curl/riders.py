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
curl -s localhost:5002/api/invalid \
    -X POST \
    -u [TOKEN]: \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
curl -s localhost:5002/api/v1/riders/accounts/share_trip_status \
    -X POST \
    -u [TOKEN]: \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
curl -s localhost:5002/api_test/ \
    -X POST \
    -u [TOKEN]: \
    -d value="Value from POST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")

run_curl("""
curl -s localhost:5002/api_test/?value=ValueFromGET\
    -u [DemoUser]: \
""")

run_curl("""
curl -s localhost:5002/api/v1/UG_Test/M_Test/C_Test\
    -X POST \
    -u [TOKEN]: \
    -d value="Value from TEST" \
    -d amount=2000 \
    -d currency=usd \
    -d description="Charge for jenny.rosen@example.com" \
    -d source=tok_mastercard
""")
