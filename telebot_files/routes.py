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
        events=database.query_all_events()
        return events

    def delete(self):
        event_json=request.get_json(force=True)
        database.delete_event(event_json['eventName'])
        database.query_all_events()


class PastEvents(Resource):
    def get(self):
        past_events=database.query_all_past_events()
        return past_events

class CurrentEvents(Resource):
     def get(self):
        current_events=database.query_all_current_events()
        return current_events   
    
class FutureEvents(Resource):
    def get(self):
        future_events=database.query_all_future_events()
        return future_events

api.add_resource(HelloWorld, '/')

api.add_resource(Events, '/events')
api.add_resource(PastEvents, '/pastevents')
api.add_resource(CurrentEvents, '/currentevents')
api.add_resource(FutureEvents, '/futureevents')

if __name__ == '__main__':
    app.run(debug=True)