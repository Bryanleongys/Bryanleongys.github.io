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
    Initializing commit function
    '''
    def commit(self):
      self.con.commit()

    '''
    Initializing tables which only needs to be called once at the start of the program
    '''

    def create_tables(self):
        try:
            self.cur.execute(
                '''CREATE TABLE events(name text, event_type text, start_date text, end_date text, collection_date text, start_time text, end_time text, item_bool text)''')
            self.cur.execute(
                '''CREATE TABLE users(username text, nusnet_id text, house text, telegram_id text)''')
            self.cur.execute(
                '''CREATE TABLE events_joined(event_name text, username text, timing text, item_chosen text)''')
            self.cur.execute(
                '''CREATE TABLE events_custom_choices(event_name text, choice_header text, choice_name text)''')
            self.cur.execute(
                '''CREATE TABLE user_feedback(event_name text, username text, feedback text)''')
            self.con.commit()
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
            self.con.commit()
            return True
        except Exception as e:
            print(e)
            return e

    def delete_user(self, telegram_id):
        try:
            self.cur.execute(
                "DELETE FROM users WHERE telegram_id=?", (telegram_id,))
            self.con.commit()    
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

    def insert_event(self, name, event_type, start_date, end_date, collection_date, start_time, end_time, item_bool):
        try:
            self.cur.execute("INSERT INTO events(name, event_type, start_date, end_date, collection_date, start_time, end_time, item_bool) values (?,?,?,?,?,?,?,?)",
                             (name, event_type, start_date, end_date, collection_date, start_time, end_time, item_bool))
            self.con.commit()
            return True
        except Exception as e:
            print(e)
            return e

    def delete_event(self, name):
        try:
            self.cur.execute("DELETE FROM events WHERE name=?", (name,))
            self.con.commit()
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
                arrayString.append(row)
            return arrayString
        except Exception as e:
            print(e)
            return e

    def query_all_current_events(self):
        today = date.today()
        dateToday = time.strptime(today.strftime("%Y/%m/%d"), "%Y/%m/%d")
        try:
            self.cur.execute("SELECT * FROM events WHERE event_type = 'Current Event'")
            rows = self.cur.fetchall()
            arrayString = []
            for row in rows:
                print(row)
                dateStart = time.strptime(row[2], "%Y/%m/%d")
                dateEnd = time.strptime(row[3], "%Y/%m/%d")
                if (dateStart <= dateToday <= dateEnd):
                    arrayString.append(
                        row)
            return arrayString
        except Exception as e:
            print(e)
            return e

    def query_all_future_events(self):
        today = date.today()
        dateToday = time.strptime(today.strftime("%Y/%m/%d"), "%Y/%m/%d")
        try:
            self.cur.execute("SELECT * FROM events WHERE event_type = 'Future Event'")
            rows = self.cur.fetchall()
            arrayString = []
            for row in rows:
                print(row)
                dateStart = time.strptime(row[2], "%Y/%m/%d")
                if (dateToday < dateStart):
                    arrayString.append(row)
            return arrayString
        except Exception as e:
            print(e)
            return e

    def query_all_past_events(self):
        today = date.today()
        dateToday = time.strptime(today.strftime("%Y/%m/%d"), "%Y/%m/%d")
        try:
            self.cur.execute("SELECT * FROM events WHERE event_type = 'Past Event'")
            rows = self.cur.fetchall()
            arrayString = []
            for row in rows:
                print(row)
                dateEnd = time.strptime(row[3], "%Y/%m/%d")
                if (dateEnd < dateToday):
                    arrayString.append(row)
            return arrayString
        except Exception as e:
            print(e)
            return e

    '''
    SQLite queries for events_joined table
    '''

    def insert_event_joined(self, event_name, username, timing, item_chosen):
        try:
            self.cur.execute(
                "INSERT INTO events_joined(event_name, username, timing, item_chosen) values (?,?,?,?)", (event_name, username, timing, item_chosen,))
            self.con.commit()
            return True
        except Exception as e:
            print(e)
            return e

    def delete_event_joined(self, event_name):
        try:
            self.cur.execute(
                "DELETE FROM events_joined WHERE event_name=?", (event_name,))
            self.con.commit()
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
    
    def query_event_joined(self, event_name):
        try:
            self.cur.execute("SELECT * FROM events_joined WHERE event_name=?", (event_name,))
            rows = self.cur.fetchall()
            arrayString=[]
            for row in rows:
                arrayString.append(row)
            print(arrayString)
            return arrayString
        except Exception as e:
            print(e)
            return e    

    '''
    SQLite queries for events_custom_choices table
    '''
    def insert_events_custom_choices(self, event_name, choice_header, choice_name):
        try:
            self.cur.execute(
                "INSERT INTO events_custom_choices(event_name, choice_header, choice_name) values (?,?,?)", (event_name, choice_header, choice_name,))
            self.con.commit()
            return True
        except Exception as e:
            print(e)
            return e

    def query_events_choices(self, event_name):
        try:
            self.cur.execute("SELECT * FROM events_custom_choices WHERE event_name = (?)", (event_name,))
            rows = self.cur.fetchall()
            for row in rows:
                print(row)
        except Exception as e:
            print(e)
            return e

    '''
    SQLite queries for user_feedback table
    '''

    def insert_user_feedback(self, event_name, username, feedback):
        try:
            self.cur.execute(
                "INSERT INTO user_feedback(event_name, username, feedback) values (?,?,?)", (event_name, username, feedback,))
            return True
        except Exception as e:
            print(e)
            return e

    def query_user_feedback(self, event_name):
        try:
            self.cur.execute("SELECT * FROM user_feedback WHERE event_name = (?)", (event_name,))
            rows = self.cur.fetchall()
            for row in rows:
                print(row)
        except Exception as e:
            print(e)
            return e
            