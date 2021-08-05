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

    def get(self):
        event_type = request.args['eventType']
        if (event_type == "past"):
            events = database.query_all_past_events()
        elif (event_type == "current"):
            events = database.query_all_current_events()
        elif (event_type == "future"):
            events = database.query_all_future_events()
        elif (event_type == "all"):
            events = database.query_all_events()
        return events

    def delete(self):
        print(request.args)
        event_json = request.get_json(force=True)
        database.delete_event(event_json['eventName'])
        database.query_all_events()

class Users(Resource):
    def get(self):
        event_name = request.args['eventName']
        users_joined = database.query_event_joined(event_name)
        return users_joined

api.add_resource(HelloWorld, '/')

api.add_resource(Events, '/events')
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(debug=True)