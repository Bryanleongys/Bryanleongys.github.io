from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource
from database import Database
import random

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
Defining helper functions
'''
def replace_dash_with_slash(dateString):
    replacedDateString = dateString.replace("-", "/")
    print(replacedDateString)
    return replacedDateString

'''
Defining Routes
'''
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class Events(Resource):
    def post(self):
        event_json = request.get_json(force=True)
        print(event_json)
        if event_json['question'] == '':
            number = 0
        else:
            number = 1
        database.insert_event(
          event_json['eventName'],
          event_json['eventType'],
          replace_dash_with_slash(event_json['startDate']),
          replace_dash_with_slash(event_json['endDate']),
          replace_dash_with_slash(event_json['collectionDate']),
          event_json['startTime'],
          event_json['endTime'],
          number
        )
        database.query_all_events()
        if number == 1:
            for choice in event_json['choiceArray']:
                database.insert_events_custom_choices(event_json['eventName'], event_json['question'], choice)
        database.query_events_choices(event_json['eventName'])

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

# class UserShuffle(Resource):
#     def get(self):
#         event_name = request.args['eventName']
#         users_joined = database.query_event_joined(event_name)
#         random.shuffle(users_joined)
#         return users_joined
        
class Feedbacks(Resource):
    def get(self):
        event_name = request.args['eventName']
        if (event_name == "general"):
            event_feedback = database.query_user_feedback("general")
        else:
            event_feedback = database.query_user_feedback(event_name)
        return event_feedback

api.add_resource(HelloWorld, '/')
api.add_resource(Events, '/events')
api.add_resource(Users, '/users')
# api.add_resource(UserShuffle, '/users/shuffle')
api.add_resource(Feedbacks, '/feedbacks')

if __name__ == '__main__':
    app.run(debug=True)