from flask import Flask
from flask_restful import Resource, Api

Coopapp = Flask(__name__)
api = Api(Coopapp)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    Coopapp.run(debug=True)