from flask import Flask, request, send_from_directory
app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return """
<html>
    <head>
    </head>
    <body>
        <div id="App"></div>
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
