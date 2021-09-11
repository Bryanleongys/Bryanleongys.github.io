from database import Database

print("============ Start Of Test ==============")
testDatabase = Database()
testDatabase.create_tables()

# Ensuring users table queries work
print("Expected: 3 users rows printed")
testDatabase.insert_user("Bryan Wong Hong Liang", "e0535051", "Aquila", "1157634501")
testDatabase.insert_user("Bryan Wong Hong Liang", "e0535051", "Aquila", "1157634501")
testDatabase.insert_user("Bryan Leong Yong Sheng", "e0535000", "Leo", "1157634500")
testDatabase.insert_user("Bryan Leong Yong Sheng", "e0535001", "Leo", "1157634502") ## same name but different nusnet_id/telegram_id
testDatabase.insert_user("Ian Tan", "e0534121", "Noctua", "e591o4")
testDatabase.delete_user("e591o4")
testDatabase.query_all_users()
print("==========================")
print("Exepcted: 1 user name printed")
testDatabase.query_user_name("1157634501")
print("==========================")
print("Exepcted: 1 user details printed")
testDatabase.query_user_details("1157634501")
print("==========================")

# Ensuring events table queries work
## Past Welfare
testDatabase.insert_event("Holiday Welfare", "2021/08/03", "2021/08/04", "2021/08/16", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Random Welfare", "2021/08/03", "2021/08/03", "2021/08/03", '15:30', '18:00', "You have been selected!",0)

## Ongoing Welfare (but signups over)
testDatabase.insert_event("Hello Welfare", "2021/09/01", "2021/09/02", "2021/09/14", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Giveaway Welfare", "2021/08/10", "2021/08/15", "2021/09/16", '15:30', '18:00', "You have been selected!",0)

## Sign up Welfare
testDatabase.insert_event("Sem 2 Welfare", "2021/09/10", "2021/09/15", "2021/09/16", '12:30', '13:30', "You have been selected!", 1)
testDatabase.insert_event("Recess Week Welfare", "2021/09/10", "2021/09/15", "2021/09/16", '15:30', '18:00', "You have been selected!",0)

## Future Welfare
testDatabase.insert_event("Orientation Welfare", "2021/10/10", "2021/10/10", "2021/10/13", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("BBT Welfare", "2021/10/10", "2021/10/10", "2021/10/13", '15:30', '18:00', "You have been selected!",0)

testDatabase.insert_event("Final Week Welfare", "2021/08/10", "2021/08/16", "2021/08/21", '15:30', '18:00', "You have been selected!",0)

testDatabase.delete_event("Final Week Welfare")
print("Expected: 6 events row printed")
testDatabase.query_all_events()
print("==========================")
print("Expected: 4 ongoing events rows printed")
testDatabase.query_all_ongoing_events()
print("==========================")
print("Expected: 2 events able to sign up rows printed")
testDatabase.query_all_sign_up_events()
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
testDatabase.insert_event_joined("Orientation Welfare", "Bryan Wong Hong Liang",  "1157634501", "bryanwhl","16:00", "")
testDatabase.insert_event_joined("Orientation Welfare", "Bryan Leong Yong Sheng",  "1157634500", "bryanlys","16:00", "")
testDatabase.insert_event_joined("Sem 2 Welfare", "Bryan Wong Hong Liang",  "1157634501", "bryanwhl","12:30", "75%")
testDatabase.insert_event_joined("Sem 2 Welfare", "Bryan Leong Yong Sheng","1157634500", "bryanlys", "12:30", "25%")
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Wong Hong Liang", "1157634501", "bryanwhl", "16:00", "")
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Leong Yong Sheng", "1157634500", "bryanlys", "16:00", "")
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Leong Yong Sheng", "1157634500", "bryanlys", "17:00", "") ## this should be printed
testDatabase.delete_event_joined("Orientation Welfare")
testDatabase.query_all_events_joined()
print("==========================")
print("Expected: 2 events_joined rows printed")
testDatabase.query_event_joined("Sem 2 Welfare")
print("==========================")
print("Expected: 2 printed")
testDatabase.query_number_user_joined("Sem 2 Welfare", "12:30")
print("==========================")


# Ensuring feedback table queries work
print("Expected: 2 user feedback rows printed")
testDatabase.insert_user_feedback("Orientation Welfare", "Bryan Wong Hong Liang", "1157634501", "My sugar level was definitely wrong; I asked for 50 percent and it tasted like 200 percent!")
testDatabase.insert_user_feedback("Orientation Welfare", "Bryan Leong Yong Sheng", "1157634500", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Random Welfare", "Bryan Leong Yong Sheng", "1157634500", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Holiday Welfare", "Bryan Leong Yong Sheng", "1157634500", "Best holiday ever!")
testDatabase.insert_user_feedback("Holiday Welfare", "Bryan Wong Hong Liang", "1157634501", "Why'd you take my holiday up?")
testDatabase.insert_user_feedback("general", "Bryan Wong Hong Liang", "1157634501", "Thank you welfare for everything!")
testDatabase.insert_user_feedback("general", "Bryan Wong Hong Liang", "1157634501", "Welfare is the best!")
testDatabase.query_user_feedback("Holiday Welfare")
print("==========================")
print("Expected: 0 event custom choices printed")
testDatabase.delete_user_feedback("Orientation Welfare")
testDatabase.query_user_feedback("Orientation Welfare")
print("==========================")

# Ensuring events_custom_choices table queries work
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "25%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "50%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "75%")
testDatabase.insert_events_custom_choices("Sem 2 Welfare", "What sugar level would you like?", "100%")
print("Expected: 4 event custom choices printed")
testDatabase.query_events_choices("Sem 2 Welfare")
print("==========================")

# Ensuring events_joined and user_feedback tables are updated after name change
testDatabase.insert_user("Biryani Leong", "e0535000", "Leo", "1157634500")
testDatabase.query_all_events_joined()
testDatabase.query_user_feedback("Random Welfare")

print("============ End Of Test ==============")
