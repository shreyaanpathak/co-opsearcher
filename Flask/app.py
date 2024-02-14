from flask import Flask

Coopapp = Flask(__name__)

@Coopapp.route("/")
def hello_world():
    return "<p>hello world!<p>"

if __name__ == '__main__':
    Coopapp.run(debug=True)