from flask import Flask, request, send_from_directory, redirect
app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return """
<html>
    <head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link rel="stylesheet" href="/static/bootstrap.min.css">
<script src="/static/jquery.min.js"></script>
<script src="/static/popper.min.js"></script>
<script src="/static/bootstrap.min.js"></script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" rel="stylesheet" type="text/css"/>

<style>
div#App {
    background: lightgray;
    max-width: 500px;
    margin: auto;
    height: 100vh;
}
div#app_loading {
    padding-top: 40vh;
    text-align: center;
}
div#app_loading * {
    display: inline-block;
    font-size: 30px;
    color: white;
}
</style>

    </head>
    <body>
    <div class="container">
    <div class="row">
    <div class="col-12 p-0">
        <div id="App">
            <div id="app_loading">
                <i class="fas fa-sync fa-spin"></i>
                <h1>Loading...</h1>
            </div>
        </div>
    </div>
    </div>
    </div>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="/reactapp/main.js"></script>
    </body>
</html>
    """

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
