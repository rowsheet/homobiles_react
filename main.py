from flask import Flask, request, send_from_directory
app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return """
<html>
    <head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/css/bootstrap.min.css" integrity="sha384-SI27wrMjH3ZZ89r4o+fGIJtnzkAnFs3E4qz9DIYioCQ5l9Rd/7UAa8DHcaL8jkWt" crossorigin="anonymous">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" rel="stylesheet" type="text/css"/>

<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/js/bootstrap.min.js" integrity="sha384-3qaqj0lc6sV/qpzrc1N5DC6i1VRn/HyX4qdPaiEFbn54VjQBEU341pvjz7Dv3n6P" crossorigin="anonymous"></script>

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
<script src="/static/dist/main.js"></script>
    </body>
</html>
    """

@app.route('/static/dist/<path:path>')
def serve_static(path):
    return send_from_directory('js/dist/', path)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
    )
