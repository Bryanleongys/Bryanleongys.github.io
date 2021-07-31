from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class Events(Resource):
    def post(self):
        event_json = request.get_json(force=True)
        print(event_json)

api.add_resource(HelloWorld, '/')

api.add_resource(Events, '/events')

if __name__ == '__main__':
    app.run(debug=True)