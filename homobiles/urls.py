import os, json
from django.urls import path, include
from django.conf.urls import url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt

admin.autodiscover()

from django.http import HttpResponse, JsonResponse

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
RENDER_MODES = [
    "DEBUG",
    "DEBUG_VERBOSE",
    # "DEBUG",
    # "DEBUG_VERBOSE",
]

def index(request):
    # TEMP: Make sure staff status since this is still testing.
    if request.user.is_authenticated and request.user.is_staff:
        return HttpResponse("""
<html>
    <head>

%(RS_DEBUG)s

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


<script src="https://maps.googleapis.com/maps/api/js?key=%(GOOGLE_MAPS_API_KEY)s"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Nunito:200,400,700&display=swap" rel="stylesheet">

<style>
body {
    background: #eee;
    margin: 0px;
}
div#App {
    background: white;
    max-width: 500px;
    margin: auto;
    height: 100vh;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 10px #00000075;
}
div#app_loading {
    padding-top: 40vh;
    text-align: center;
}
div#app_loading_spinner {
    display: inline-block;
    border: 25px solid #ffabc8;
    border-top: 25px solid #ff4d8a;
    border-radius: 50%%;
    width: 50px;
    height: 50px;
    animation: spin 1.5s linear infinite;
}
@keyframes spin {
  0%% { transform: rotate(0deg); }
  100%% { transform: rotate(360deg); }
}
</style>

    </head>
    <body class="%(RENDER_MODES)s">
        <div id="App">
            <div id="app_loading">
                <div id="app_loading_spinner">
                </div>
            </div>
        </div>
    </div>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="/static/dist/main.js"></script>
    </body>
</html>
        """ % {
            "GOOGLE_MAPS_API_KEY": GOOGLE_MAPS_API_KEY,
            "RENDER_MODES": " ".join(RENDER_MODES),
            "RS_DEBUG": """
            <script>
                window.RS_DEBUG = true;
                sessionStorage.setItem("RS_DEBUG", true);
            </script>""" if "DEBUG" in RENDER_MODES else """
            <script>
                window.RS_DEBUG = true;
                sessionStorage.setItem("RS_DEBUG", false);
            </script>"""
        })
    else:
        return HttpResponse("""
                <p>You're logged out</p>
                <a href="/accounts/login">login</a>
        """)

from .api import API 

urlpatterns = [
    path("admin/", admin.site.urls),
    url(r"^accounts/", include("allauth.urls")),
    path("", index),
    # API V1
    url(r"^api", API),
]
