from database import Database

print("============ Start Of Test ==============")
testDatabase = Database()
testDatabase.create_tables()

# Ensuring users table queries work
print("Expected: 2 users rows printed")
testDatabase.insert_user("bryanwhl", "e0535051", "Aquila", "e591o2")
testDatabase.insert_user("bryanlys", "e0535000", "Leo", "e591o3")
testDatabase.insert_user("Ian Tan", "e0534121", "Noctua", "e591o4")
testDatabase.delete_user("e591o4")
testDatabase.query_all_users()
print("==========================")

# Ensuring events table queries work
testDatabase.insert_event("Sem 2 Welfare", "Current Event", "03/08/2021", "05/08/2021", "09/08/2021", '12:30', '13:30', 0)
testDatabase.insert_event("Holiday Welfare", "Past Event", "20/07/2021", "21/07/2021", "26/07/2021", '15:30', '18:00', 0)
testDatabase.insert_event("Random Welfare", "Past Event", "19/07/2021", "21/07/2021", "26/07/2021", '15:30', '18:00', 0)
testDatabase.insert_event("Orientation Welfare", "Future Event", "11/08/2021", "12/08/2021", "13/08/2021", '15:30', '18:00', 0)
testDatabase.insert_event("Recess Week Welfare", "Current Event", "03/08/2021", "09/08/2021", "10/08/2021", '15:30', '18:00', 1)
testDatabase.insert_event("Finals Week Welfare", "Future Event", "21/11/2021", "29/11/2021", "26/11/2021", '15:30', '18:00', 0)

testDatabase.delete_event("Final Week Welfare")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "Sugar Level", "25%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "Sugar Level", "50%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "Sugar Level", "75%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "Sugar Level", "100%")
print("Expected: 2 current events rows printed")
testDatabase.query_all_current_events()
print("==========================")
print("Expected: 2 future events rows printed")
testDatabase.query_all_future_events()
print("==========================")
print("Expected: 2 past events rows printed")
testDatabase.query_all_past_events()
print("==========================")

# Ensuring events_joined table queries work
print("Expected: 4 events_joined rows printed")
testDatabase.insert_event_joined("Orientation Welfare", "bryanwhl", "16:00", 0)
testDatabase.insert_event_joined("Orientation Welfare", "bryanlys", "16:00", 0)
testDatabase.insert_event_joined("Sem 2 Welfare", "bryanwhl", "16:00", 0)
testDatabase.insert_event_joined("Sem 2 Welfare", "bryanlys", "16:00", 0)
testDatabase.insert_event_joined("Recess Week Welfare", "bryanwhl", "16:00", 0)
testDatabase.insert_event_joined("Recess Week Welfare", "bryanlys", "16:00", 0)
testDatabase.delete_event_joined("Orientation Welfare")
testDatabase.query_all_events_joined()
print("==========================")

print("Expected: 2 user feedback rows printed")
testDatabase.insert_user_feedback("Orientation Welfare", "bryanwhl", "My sugar level was definitely wrong; I asked for 50 percent and it tasted like 200 percent!")
testDatabase.insert_user_feedback("Orientation Welfare", "bryanlys", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Random Welfare", "bryanlys", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Holiday Welfare", "bryanlys", "Best holiday ever!")
testDatabase.insert_user_feedback("Holiday Welfare", "bryanlwhl", "Why'd you take my holiday up?")
testDatabase.insert_user_feedback("general", "bryanlwhl", "Thank you welfare for everything!")
testDatabase.insert_user_feedback("general", "bryanlwhl", "Welfare is the best!")
print(testDatabase.query_user_feedback("Holiday Welfare"))
print("==========================")

# Ensuring query_event_joined query work
print("Expected: 2 events_joined rows printed")
testDatabase.query_event_joined("Sem 2 Welfare")

# Ensuring events_custom_choices work
print("Expected: 4 event custom choices printed")
testDatabase.query_events_choices("Sem 2 Welfare")

print("============ End Of Test ==============")
