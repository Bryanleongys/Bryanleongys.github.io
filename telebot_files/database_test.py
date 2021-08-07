from database import Database

print("============ Start Of Test ==============")
testDatabase = Database()
testDatabase.create_tables()

# Ensuring users table queries work
print("Expected: 2 users rows printed")
testDatabase.insert_user("Bryan Wong Hong Liang", "e0535051", "Aquila", "1157634500")
testDatabase.insert_user("Bryan Leong Yong Sheng", "e0535000", "Leo", "1157634500")
testDatabase.insert_user("Ian Tan", "e0534121", "Noctua", "456789")
testDatabase.delete_user("e591o4")
testDatabase.query_all_users()
print("==========================")
print("Exepcted: 1 user name printed")
testDatabase.query_user_name("123456")
print("==========================")

# Ensuring events table queries work
testDatabase.insert_event("Sem 2 Welfare", "Current Event", "2021/08/03", "2021/08/10", "2021/08/03", '12:30', '13:30', "You have been selected!", 1)
testDatabase.insert_event("Holiday Welfare", "Past Event", "2021/08/03", "2021/08/03", "2021/08/03", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Random Welfare", "Past Event", "2021/08/03", "2021/08/03", "2021/08/03", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Orientation Welfare", "Future Event", "2021/08/10", "2021/08/10", "2021/08/03", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Recess Week Welfare", "Current Event", "2021/08/03", "2021/08/10", "2021/08/03", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Finals Week Welfare", "Future Event", "2021/08/10", "2021/08/10", "2021/08/03", '15:30', '18:00', "You have been selected!",0)

testDatabase.delete_event("Final Week Welfare")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "25%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "50%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "75%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "100%")
print("Expected: 2 current events rows printed")
testDatabase.query_all_current_events()
print("==========================")
print("Expected: 2 future events rows printed")
testDatabase.query_all_future_events()
print("==========================")
print("Expected: 2 past events rows printed")
testDatabase.query_all_past_events()
print("==========================")
print("Expected: 1 event message printed")
testDatabase.query_event_message("Sem 2 Welfare")
print("==========================")

# Ensuring events_joined table queries work
print("Expected: 4 events_joined rows printed")
testDatabase.insert_event_joined("Orientation Welfare", "Bryan Wong Hong Liang",  "1157634500", "bryanwhl","16:00", "")
testDatabase.insert_event_joined("Orientation Welfare", "Bryan Leong Yong Sheng",  "1157634500", "bryanlys","16:00", "")
testDatabase.insert_event_joined("Sem 2 Welfare", "Bryan Wong Hong Liang",  "1157634500", "bryanwhl","16:00", "75%")
testDatabase.insert_event_joined("Sem 2 Welfare", "Bryan Leong Yong Sheng","1157634500", "bryanlys", "16:00", "25%")
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Wong Hong Liang", "1157634500", "bryanwhl", "16:00", "")
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Leong Yong Sheng", "1157634500", "bryanlys", "16:00", "")
testDatabase.delete_event_joined("Orientation Welfare")
testDatabase.query_all_events_joined()
print("==========================")

print("Expected: 2 user feedback rows printed")
testDatabase.insert_user_feedback("Orientation Welfare", "Bryan Wong Hong Liang", "My sugar level was definitely wrong; I asked for 50 percent and it tasted like 200 percent!")
testDatabase.insert_user_feedback("Orientation Welfare", "Bryan Leong Yong Sheng", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Random Welfare", "Bryan Leong Yong Sheng", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Holiday Welfare", "Bryan Leong Yong Sheng", "Best holiday ever!")
testDatabase.insert_user_feedback("Holiday Welfare", "Bryan Wong Hong Liang", "Why'd you take my holiday up?")
testDatabase.insert_user_feedback("general", "Bryan Wong Hong Liang", "Thank you welfare for everything!")
testDatabase.insert_user_feedback("general", "Bryan Wong Hong Liang", "Welfare is the best!")
print(testDatabase.query_user_feedback("Holiday Welfare"))
print("==========================")

# Ensuring query_event_joined query work
print("Expected: 2 events_joined rows printed")
testDatabase.query_event_joined("Sem 2 Welfare")
print("==========================")

# Ensuring events_custom_choices work
print("Expected: 4 event custom choices printed")
testDatabase.query_events_choices("Sem 2 Welfare")
print("==========================")

print("============ End Of Test ==============")
