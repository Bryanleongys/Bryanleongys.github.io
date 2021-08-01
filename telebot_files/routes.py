from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource
from database import Database

'''
Initializing Flask and CORS
'''
app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

'''
Initializing Database
'''
database = Database()

'''
Defining Routes
'''
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class Events(Resource):
    def post(self):
        event_json = request.get_json(force=True)
        database.insert_event(
          event_json['eventName'],
          event_json['eventType'],
          event_json['startDate'],
          event_json['endDate'],
          event_json['collectionDate'],
          event_json['startTime'],
          event_json['endTime'],
          0
        )
        database.query_all_events()

api.add_resource(HelloWorld, '/')

api.add_resource(Events, '/events')

if __name__ == '__main__':
    app.run(debug=True)