import os
import sys
import django

"""-----------------------------------------------------------------------------
This file is intended to be imported from any files in other directories wishing
to interact with this apps Django functionality with configured settings and
environment variables. You should add the path of this file to the sys.path and
run cli_import.run():

    import sys
    sys.path.append("../..") # This depend on the relative path to this file.
    import cli_import
    cli_import.run()
-----------------------------------------------------------------------------"""

def run():

    #---------------------------------------------------------------------------
    # Set the settings file depending on where it is.
    #---------------------------------------------------------------------------

    os.environ["DJANGO_SETTINGS_MODULE"] = "homobiles.settings"

    #---------------------------------------------------------------------------
    # We need to know the path of the application root to set sys.paths and
    # be able to import things such as the settings module and .env variables.
    #---------------------------------------------------------------------------

    APP_ROOT_PATH = "/%s/" % "/".join(os.path.abspath(__file__).split("/")[0:-1]).strip("/")
    sys.path.append(APP_ROOT_PATH)

    #---------------------------------------------------------------------------
    # Set required configuration from variables.
    #---------------------------------------------------------------------------
    # @TODO Read and parse from .env file (including variables).

    os.environ["DATABASE_URL"] = "postgres://postgres@localhost:5432/homobiles?sslmode=disable"

    #---------------------------------------------------------------------------
    # Run django setup.
    #---------------------------------------------------------------------------

    django.setup()
