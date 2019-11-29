import os
from flask import Flask, request, send_from_directory, redirect
app = Flask(__name__, static_url_path='')

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
RENDER_MODES = [
    "DEBUG",
    "DEBUG_VERBOSE",
    # "DEBUG",
    # "DEBUG_VERBOSE",
    # "DEBUG_VERBOSE_BORDER_TOP",
    # "DEBUG_VERBOSE_BORDER_BOTTOM",
]

@app.route('/')
def index():
    return """
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
<script src="/reactapp/main.js"></script>
    </body>
</html>
    """ % {
        "GOOGLE_MAPS_API_KEY": GOOGLE_MAPS_API_KEY,
        "RENDER_MODES": " ".join(RENDER_MODES),
        "RS_DEBUG": "<script>window.RS_DEBUG = true;</script>" if "DEBUG" in RENDER_MODES else ""
    }

@app.route('/reactapp/<path:path>')
def reactapp(path):
    return send_from_directory('reactapp/dist/', path)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static/', path)

@app.errorhandler(404)
def catchall(e):
    return redirect("/", 302)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
    )
