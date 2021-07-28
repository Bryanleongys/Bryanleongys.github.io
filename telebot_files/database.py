import sqlite3
from datetime import datetime
from datetime import date
import time


class Database:

    '''
    Initializing database.db file and connecting to the file
    '''

    def __init__(self):
        self.con = sqlite3.connect(
            'database.db', check_same_thread=False)
        self.cur = self.con.cursor()

    '''
    Initializing tables which only needs to be called once at the start of the program
    '''

    def create_tables(self):
        try:
            self.cur.execute(
                '''CREATE TABLE events(name text, start_date text, end_date text, collection_date text, start_time integer, end_time integer, item_bool integer)''')
            self.cur.execute(
                '''CREATE TABLE users(username text, nusnet_id text, house text, telegram_id text)''')
            self.cur.execute(
                '''CREATE TABLE events_joined(event_name text, username text, timing integer, item_chosen text)''')
            return True
        except Exception as e:
            print(e)
            return e

    '''
    SQLite queries for users table
    '''

    def insert_user(self, username, nusnet_id, house, telegram_id):
        try:
            self.cur.execute("INSERT INTO users(username, nusnet_id, house, telegram_id) VALUES(?,?,?,?)",
                             (username, nusnet_id, house, telegram_id,))
            return True
        except Exception as e:
            print(e)
            return e

    def delete_user(self, telegram_id):
        try:
            self.cur.execute(
                "DELETE FROM users WHERE telegram_id=?", (telegram_id,))
        except Exception as e:
            print(e)
            return e

    def query_all_users(self):
        try:
            self.cur.execute("SELECT * FROM users")
            rows = self.cur.fetchall()
            for row in rows:
                print(row)
        except Exception as e:
            print(e)
            return e

    '''
    SQLite queries for events table
    '''

    def insert_events(self, name, start_date, end_date, collection_date, start_time, end_time, item_bool):
        try:
            self.cur.execute("INSERT INTO events(name, start_date, end_date, collection_date, start_time, end_time, item_bool) values (?,?,?,?,?,?,?)",
                             (name, start_date, end_date, collection_date, start_time, end_time, item_bool))
            return True
        except Exception as e:
            print(e)
            return e

    def delete_events(self, name):
        try:
            self.cur.execute("DELETE FROM events WHERE name=?", (name,))
        except Exception as e:
            print(e)
            return e

    def query_all_events(self):
        try:
            self.cur.execute("SELECT * FROM events")
            rows = self.cur.fetchall()
            arrayString = []
            for row in rows:
                print(row)
                arrayString.append(
                    row[0] + ", ends on " + row[2] + ", " + str(row[5]) + "hrs.")
            return arrayString
        except Exception as e:
            print(e)
            return e

    def query_all_current_events(self):
        today = date.today()
        dateToday = time.strptime(today.strftime("%d/%m/%Y"), "%d/%m/%Y")
        try:
            self.cur.execute("SELECT * FROM events")
            rows = self.cur.fetchall()
            arrayString = []
            for row in rows:
                print(row)
                dateStart = time.strptime(row[1], "%d/%m/%Y")
                dateEnd = time.strptime(row[2], "%d/%m/%Y")
                if (dateStart <= dateToday <= dateEnd):
                    arrayString.append(
                        row)
            return arrayString
        except Exception as e:
            print(e)
            return e

    def query_all_future_events(self):
        today = date.today()
        dateToday = time.strptime(today.strftime("%d/%m/%Y"), "%d/%m/%Y")
        try:
            self.cur.execute("SELECT * FROM events")
            rows = self.cur.fetchall()
            arrayString = []
            for row in rows:
                print(row)
                dateStart = time.strptime(row[1], "%d/%m/%Y")
                if (dateToday < dateStart):
                    arrayString.append(row)
            return arrayString
        except Exception as e:
            print(e)
            return e

    def query_all_past_events(self):
        today = date.today()
        dateToday = time.strptime(today.strftime("%d/%m/%Y"), "%d/%m/%Y")
        try:
            self.cur.execute("SELECT * FROM events")
            rows = self.cur.fetchall()
            arrayString = []
            for row in rows:
                print(row)
                dateEnd = time.strptime(row[2], "%d/%m/%Y")
                if (dateEnd < dateToday):
                    arrayString.append(row)
            return arrayString
        except Exception as e:
            print(e)
            return e

    '''
    SQLite queries for events_joined table
    '''

    def insert_events_joined(self, event_name, username, timing, item_chosen):
        try:
            self.cur.execute(
                "INSERT INTO events_joined(event_name, username, timing, item_chosen) values (?,?,?,?)", (event_name, username, timing, item_chosen,))
            return True
        except Exception as e:
            print(e)
            return e

    def delete_events_joined(self, event_name):
        try:
            self.cur.execute(
                "DELETE FROM events_joined WHERE event_name=?", (event_name,))
        except Exception as e:
            print(e)
            return e

    def query_all_events_joined(self):
        try:
            self.cur.execute("SELECT * FROM events_joined")
            rows = self.cur.fetchall()
            for row in rows:
                print(row)
        except Exception as e:
            print(e)
            return e


'''
Mock data testing to ensure that the queries work
'''
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
testDatabase.insert_events("Sem 2 Welfare", "18/07/2021", "19/07/2021", "26/11/2021", 800, 1200)
testDatabase.insert_events("Holiday Welfare", "19/07/2021", "21/07/2021", "26/11/2021", 800, 1200)
testDatabase.insert_events("Orientation Welfare", "07/08/2021", "09/08/2021", "08/08/2021", 1400, 1700)
testDatabase.insert_events("Recess Week Welfare", "03/10/2021", "13/10/2021", "08/10/2021", 1200, 1700)
testDatabase.insert_events("Finals Week Welfare", "21/11/2021", "29/11/2021", "26/11/2021", 800, 1200)
testDatabase.delete_events("Finals Week Welfare")
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
testDatabase.insert_events_joined("Orientation Welfare", "bryanwhl", 1100)
testDatabase.insert_events_joined("Orientation Welfare", "bryanlys", 1100)
testDatabase.insert_events_joined("Recess Week Welfare", "bryanwhl", 1200)
testDatabase.insert_events_joined("Recess Week Welfare", "bryanlys", 1200)
testDatabase.delete_events_joined("Orientation Welfare")
testDatabase.query_all_events_joined()
