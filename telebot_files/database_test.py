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
testDatabase.insert_events("Sem 2 Welfare", "Current", "18/07/2021", "19/07/2021", "26/11/2021", 800, 1200, 0)
testDatabase.insert_events("Holiday Welfare", "Past", "19/07/2021", "21/07/2021", "26/11/2021", 800, 1200, 0)
testDatabase.insert_events("Random Welfare", "Past", "19/07/2021", "21/07/2021", "26/11/2021", 800, 1200, 0)
testDatabase.insert_events("Orientation Welfare", "Future", "07/08/2021", "09/08/2021", "08/08/2021", 1400, 1700, 0)
testDatabase.insert_events("Recess Week Welfare", "Current", "03/10/2021", "13/10/2021", "08/10/2021", 1200, 1700, 0)
testDatabase.insert_events("Finals Week Welfare", "Future", "21/11/2021", "29/11/2021", "26/11/2021", 800, 1200, 0)
testDatabase.delete_events("Final Week Welfare")
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
print("Expected: 2 events_joined rows printed")
testDatabase.insert_events_joined("Orientation Welfare", "bryanwhl", 1100, 0)
testDatabase.insert_events_joined("Orientation Welfare", "bryanlys", 1100, 0)
testDatabase.insert_events_joined("Recess Week Welfare", "bryanwhl", 1200, 0)
testDatabase.insert_events_joined("Recess Week Welfare", "bryanlys", 1200, 0)
testDatabase.delete_events_joined("Orientation Welfare")
testDatabase.query_all_events_joined()
print("==========================")

# Ensuring events_custom_choices work
print("Expected: 4 event custom choices printed")
testDatabase.query_event_choices("Sem 2 Welfare")

print("============ End Of Test ==============")
