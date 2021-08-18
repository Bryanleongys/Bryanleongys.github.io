from flask import Flask, request, jsonify, make_response, abort, Response
from flask_cors import CORS
from flask_restful import Api, Resource
from database import Database
import random
import Constants as keys
import requests
import json

'''
Initializing Flask and CORS
'''
app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
# cors = CORS(app, resources={r"*": {"origins": "http://localhost:port"}})
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

        ## Check event exists
        if (event_json['requestType'] == "check") :
            eventExist = database.query_event_exist(event_json['eventName'])
            if (eventExist):
                return True
            return False
        
        ## Add event
        if event_json['question'] == '':
            number = 0
        else:
            number = 1
        event_inserted = database.insert_event(
          event_json['eventName'],
        #   event_json['eventType'],
          replace_dash_with_slash(event_json['startDate']),
          replace_dash_with_slash(event_json['endDate']),
          replace_dash_with_slash(event_json['collectionDate']),
          event_json['startTime'],
          event_json['endTime'],
          event_json['message'],
          number
        )
        if not event_inserted:
            abort(Response("Event name already exists! Please use another name", 401))
        database.query_all_events()
        if number == 1:
            for choice in event_json['choiceArray']:
                database.insert_events_custom_choices(event_json['eventName'], event_json['question'], choice)
        database.query_events_choices(event_json['eventName'])

    def get(self):
        event_type = request.args['eventType']
        print(event_type)
        if (event_type == "past"):
            events = database.query_all_past_events()
        elif (event_type == "current"):
            print("Events are here!!")
            events = database.query_all_ongoing_events()
        elif (event_type == "future"):
            events = database.query_all_future_events()
        elif (event_type == "all"):
            events = database.query_all_events()
        print(events)
        return make_response(jsonify(events), 200)

    def delete(self):
        print(request.args)
        event_json = request.get_json(force=True)
        database.delete_event(event_json['eventName'])
        database.query_all_events()

class EventChoices(Resource):
    def get(self):
        event_name = request.args['eventName']
        event_choices = database.query_events_choices(event_name)
        print(event_choices)
        return make_response(jsonify(event_choices), 200)


class Users(Resource):
    def get(self):
        event_name = request.args['eventName']
        users_joined = database.query_event_joined(event_name)
        return make_response(jsonify(users_joined), 200)
    
    def post(self):
        event_json = request.get_json(force=True)
        token = keys.API_KEY
        chat_id = event_json['chat_id']
        event = event_json['event']
        text = database.query_event_message(event)
        url_req = "https://api.telegram.org/bot" + token + "/sendMessage" + "?chat_id=" + str(chat_id) + "&text=" + text 
        results = requests.get(url_req)
        print(results.json())

class UserShuffle(Resource):
    def get(self):
        event_name = request.args['eventName']
        choice_pax = request.args.getlist('choicePax[]')
        total_pax = int(request.args['totalPax'])
        event_choices = database.query_events_choices(event_name)
        print(event_choices)

        if choice_pax:
            choice_pax = list(map(lambda choice: int(choice), choice_pax))

            final_user_array = []

            for index in range(len(choice_pax)):
                pax = choice_pax[index]
                choice = event_choices[index][2]
                users = database.query_user_choice(event_name, choice)
                random.shuffle(users)
                users = users[0:pax]
                for user in users:
                    final_user_array.append(user)
        else:
            final_user_array = []
            users = database.query_event_joined(event_name)
            random.shuffle(users)
            users = users[0:total_pax]
            for user in users:
                final_user_array.append(user)

        print(final_user_array)
        # Returns the list of users chosen based on the algorithm
        return make_response(jsonify(final_user_array), 200)
        
class Feedbacks(Resource):
    def get(self):
        event_name = request.args['eventName']
        if (event_name == "general"):
            event_feedback = database.query_user_feedback("general")
        else:
            event_feedback = database.query_user_feedback(event_name)
        return make_response(jsonify(event_feedback), 200)

api.add_resource(HelloWorld, '/')
api.add_resource(Events, '/events')
api.add_resource(EventChoices, '/events/choices')
api.add_resource(Users, '/users')
api.add_resource(UserShuffle, '/users/shuffle')
api.add_resource(Feedbacks, '/feedbacks')

if __name__ == '__main__':
    app.run(debug=True)