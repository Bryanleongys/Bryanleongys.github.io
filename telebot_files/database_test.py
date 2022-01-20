from database import Database

print("============ Start Of Test ==============")
testDatabase = Database()
testDatabase.create_tables()

# Ensuring users table queries work
print("Expected: 9 users rows printed")
testDatabase.insert_user("Bryan Wong Hong Liang", "01M", "Aquila", "1157634501", "bryanwhl", 1)
testDatabase.insert_user("Bryan Leong Yong Sheng", "02M", "Leo", "1157634500", "smulboi", 2)
testDatabase.insert_user("Bryan Leong Yong Sheng", "03M", "Leo", "1157634502", "smulboi", 3) ## same name but different nusnet_id/telegram_id
testDatabase.insert_user("Bryan Wong", "01M", "Leo", "1157634501", "bryanwhl", 1) ## replacement of user
testDatabase.insert_user("Ian Tan", "04M", "Noctua", "e591o4", "ian", 0)
testDatabase.insert_user("Steve Lim", "05M", "Aquila", "1000000000", "stevelim", 1)
testDatabase.insert_user("Diane Leong", "06M", "Noctua", "1000000001", "dianeleong", 0)
testDatabase.insert_user("Kyle Ng", "07M", "Ursa", "1000000002", "kyleng", 2) # delete
testDatabase.insert_user("Eliza Soh", "08M", "Leo", "1000000003", "elizasoh", 1)
testDatabase.insert_user("Tan Jia Hui", "09M", "Draco", "1000000004", "tanjiahui", 2) # delete
testDatabase.insert_user("Nathan Lee", "10M", "Noctua", "1000000005", "nathanlee", 0)
testDatabase.insert_user("Vivian Foo", "11M", "Ursa", "1000000006", "vivianfoo", 0)
testDatabase.insert_user("Daniel Chia", "12M", "Draco", "1000000007", "danielchia", 0)
testDatabase.delete_user("e591o4")
testDatabase.delete_user("1000000004")
testDatabase.delete_user("1000000002")
testDatabase.query_all_users()
print("==========================")
print("Expected: 1 user name printed - Bryan Wong")
testDatabase.query_user_name("1157634501")
print("==========================")
print("Exepcted: 1 user details printed - Daniel Chia")
testDatabase.query_user_details("1000000007")
print("==========================")

# Ensuring events table queries work
## Past Welfare
testDatabase.insert_event("Holiday Welfare", "2021/08/03", "2021/08/04", "2021/08/16", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Random Welfare", "2021/08/03", "2021/08/03", "2021/08/03", '15:30', '18:00', "You have been selected!",0)

## Ongoing Welfare (but signups over)
testDatabase.insert_event("Hello Welfare", "2021/09/01", "2021/09/02", "2022/01/20", '15:30', '18:00', "You have been selected!",0)
testDatabase.insert_event("Giveaway Welfare", "2021/08/10", "2021/08/15", "2022/01/20", '15:30', '18:00', "You have been selected!",0)

## Sign up Welfare
testDatabase.insert_event("Sem 2 Welfare", "2021/12/10", "2022/01/20", "2022/02/20", '12:30', '13:30', "You have been selected!", 1)
testDatabase.insert_event("Recess Week Welfare", "2021/12/10", "2022/01/20", "2022/02/20", '15:30', '18:00', "You have been selected!",0)

## Future Welfare
testDatabase.insert_event("Orientation Welfare", "2022/10/10", "2022/10/10", "2022/10/13", '15:30', '18:00', "You have been selected!",1)
testDatabase.insert_event("BBT Welfare", "2022/10/10", "2022/10/10", "2022/10/13", '15:30', '18:00', "You have been selected!",0)

testDatabase.insert_event("Final Week Welfare", "2021/08/10", "2021/08/16", "2021/08/21", '15:30', '18:00', "You have been selected!",0)

testDatabase.delete_event("Final Week Welfare")
print("Expected: 8 events row printed")
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
print("Expected: 6 events_joined rows printed")
testDatabase.insert_event_joined("Orientation Welfare", "Bryan Wong",  "1157634501", "bryanwhl","16:00", "socks")
testDatabase.insert_event_joined("Orientation Welfare", "Bryan Leong Yong Sheng",  "1157634500", "bryanlys","17:00", "lanyard")
testDatabase.insert_event_joined("Sem 2 Welfare", "Bryan Wong",  "1157634501", "bryanwhl","12:30", "75%")
testDatabase.insert_event_joined("Sem 2 Welfare", "Bryan Leong Yong Sheng","1157634500", "bryanlys", "12:30", "25%")
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Wong", "1157634501", "bryanwhl", "16:00", "")
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Leong Yong Sheng", "1157634500", "bryanlys", "16:00", "") ## this should not be printed
testDatabase.insert_event_joined("Recess Week Welfare", "Bryan Leong Yong Sheng", "1157634500", "bryanlys", "17:00", "") ## this should be printed
testDatabase.insert_event_joined("Recess Week Welfare", "Steve Lim",  "1000000000", "stevelim","16:00", "")
testDatabase.insert_event_joined("Recess Week Welfare", "Diane Leong",  "1000000001", "dianeleong","17:00", "")
testDatabase.delete_event_joined("Orientation Welfare")
testDatabase.query_all_events_joined()
print("==========================")
print("Expected: 1 events_joined rows printed")
testDatabase.query_event_joined("Recess Week Welfare", 2)
print("==========================")
print("Expected: 2 printed")
testDatabase.query_number_user_joined("Sem 2 Welfare", "12:30")
print("==========================")
print("Expected: 1 events_joined rows printed")
testDatabase.query_user_choice("Sem 2 Welfare", "25%", 2)
print("==========================")


# Ensuring feedback table queries work
print("Expected: 4 user feedback rows printed")
testDatabase.insert_user_feedback("Orientation Welfare", "Bryan Wong", "My sugar level was definitely wrong; I asked for 50 percent and it tasted like 200 percent!")
testDatabase.insert_user_feedback("Orientation Welfare", "Bryan Leong Yong Sheng", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Random Welfare", "Bryan Leong Yong Sheng", "The bubble tea is the best, thanks!")
testDatabase.insert_user_feedback("Holiday Welfare", "Bryan Leong Yong Sheng", "Best holiday ever!")
testDatabase.insert_user_feedback("Holiday Welfare", "Bryan Wong", "Why'd you take my holiday up?")
testDatabase.insert_user_feedback("general", "Bryan Wong", "Thank you welfare for everything!")
testDatabase.insert_user_feedback("general", "Steve Lim", "Welfare is the best!")
testDatabase.insert_user_feedback("general", "Daniel Chia", "Welfare best comm!")
testDatabase.insert_user_feedback("general", "Eliza Soh", "Thanks for the bbt!")
testDatabase.query_user_feedback("general")
print("==========================")
print("Expected: 2 user_feedback rows printed")
testDatabase.query_user_feedback("Holiday Welfare")
print("==========================")
print("Expected: 0 user feedback rows printed")
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
print("Expected: False printed")
print(testDatabase.query_event_choice_exist("Orientation Welfare"))
print("==========================")
print("Expected: True printed")
print(testDatabase.query_event_choice_exist("Sem 2 Welfare"))
print("==========================")

# Ensuring win_count queries work
print("Expected: Bryan Wong Hong Liang win_count increased to 2")
testDatabase.increase_wincount("1157634501")
testDatabase.query_user_details("1157634501")
print("==========================")

# Ensuring events_joined and user_feedback tables are updated after name change
testDatabase.insert_user("Biryani Leong", "02M", "Leo", "1157634500", 'smulboi', 2)
print("Expected: Bryan Leong Yong Sheng changed to Biryani Leong")
testDatabase.query_user_details("1157634500")
print("==========================")
print("Expected: events_joined for UserID = 2 is retained.")
testDatabase.query_all_events_joined()
print("==========================")
print("Expected: user_feedback for UserID=2 is retained.")
testDatabase.query_user_feedback("Random Welfare")

print("============ End Of Test ==============")

