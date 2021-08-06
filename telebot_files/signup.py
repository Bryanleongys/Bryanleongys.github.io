import keyboards
import initialization
from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove


def prompt_welfare(update, context):
    print("hello")
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Please select the following options:"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.welfare_keyboard()
    )

    return ConversationHandler.END

# events_array: Array of String type
# events_array = ["Idiot Day", "Kill Yourself Day", "Hello Day"]


def show_future_welfare(update, context, events_array):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Below are the list of welfare in the future!"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.future_events_keyboard(events_array)
    )
    return ConversationHandler.END


# def check_query(update, context):
#     query = update.callback_query
#     if (query.data == "current_welfare"):
#         print("helloquery")
#         ConversationHandler.END()
#         return show_current_welfare()
#     else:
#         return 2

def show_current_welfare(update, context, events_array):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Please select one of the options to sign up for welfare!"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.current_events_keyboard(events_array)
    )
    return 1


def show_timings(update, context, timings, event_dates, events, items_bool_array):
    query = update.callback_query
    if (query.data == "return_back"):
        index = context.user_data["index"]
    else:
        index = int(query.data[7:])
    chat_id = query.message.chat_id
    message_id = query.message.message_id
    context.user_data["event_name"] = events[index]
    context.user_data["event_date"] = event_dates[index]
    context.user_data["index"] = index

    text = "Select time slot to sign up for " + \
        events[index] + " on " + event_dates[index] + "."
    print(timings[index])
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.timings_keyboard(timings[index])
    )
    # print(items_bool_array[index] == '1')
    if (items_bool_array[index] == '1'):
        return 2
    else:
        return 3


def show_item_events(update, context, db):
    query = update.callback_query
    index = context.user_data["index"]
    chat_id = query.message.chat_id
    message_id = query.message.message_id
    timing = int(query.data[6:])
    context.user_data["timing"] = timing
    event_name = context.user_data["event_name"]

    arrayDatabase = db.query_events_choices(event_name)
    arrayOptions = []

    for row in arrayDatabase:
        arrayOptions.append(row[2])
        
    text = arrayDatabase[0][1]

    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.event_items_keyboard(arrayOptions)
    )
    # update.message.reply_text(text, reply_markup=keyboards.event_items_keyboard())
    return 3


def confirm_timing(update, context, db, items_bool_array):
    query = update.callback_query
    username = query.message.chat.username
    index = context.user_data["index"]

    if (items_bool_array[index] == '1'):
        timing = context.user_data["timing"]
        item_chosen = query.data[6:]
        print(item_chosen)
    else:
        timing = int(query.data[6:])
        item_chosen = ""

    chat_id = query.message.chat_id
    message_id = query.message.message_id
    event_name = context.user_data["event_name"]
    event_date = context.user_data["event_date"]

    db.insert_event_joined(event_name, username, timing, item_chosen)
    db.query_all_events_joined()

    text = "You have signed up for " + event_name + \
        " on " + str(event_date) + ", " + str(timing) + "."
    text2 = "Welcome home. Feel free to access the features below!"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
    )
    context.bot.send_message(
        chat_id=chat_id,
        text=text2,
        reply_markup=keyboards.main_options_keyboard()
    )

    return ConversationHandler.END


def return_home(update, context):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Welcome home. Feel free to access the features below!"

    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.main_options_keyboard(),
    )

    return ConversationHandler.END
