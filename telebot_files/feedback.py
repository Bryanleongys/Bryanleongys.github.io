import keyboards
import initialization
import signup
from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove


def prompt_feedback(update, context):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Please select the following options:"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.feedback_keyboard()
    )

    return ConversationHandler.END

# General Feedback


def get_general_feedback(update, context):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "May I know what you would like to tell our RC4 Welfare Committee?"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.general_feedback_back()
    )
    return 1


def confirm_general_feedback(update, context, db):
    chat_id = update.message.chat.id
    user_input = update.message.text
    username = update.message.from_user.username
    event_name = "general"

    db.insert_user_feedback(event_name, username, user_input)
    db.query_user_feedback(event_name)


    text = "Thank you for your message! We will feedback RC4 Welfare Committee."
    text2 = "Welcome home. Feel free to access the features below!"
    update.message.reply_text(text=text)
    update.message.reply_text(
        text=text2, reply_markup=keyboards.main_options_keyboard())

    return ConversationHandler.END

# Event Feedback


def show_feedback_events(update, context, events_array):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Please select the event you would like to give feedback for."
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.feedback_events_keyboard(events_array)
    )
    return 1


def get_event_feedback(update, context, events):
    query = update.callback_query
    index = int(query.data[6:])
    chat_id = query.message.chat_id
    message_id = query.message.message_id
    context.user_data["event_name"] = events[index]

    text = "Thank you. What feedback would you like to give for " + \
        events[index] + " ?"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.events_feedback_back()
    )
    return 2

def confirm_event_feedback(update, context, db):
    chat_id = update.message.chat.id
    user_input = update.message.text
    username = update.message.from_user.username
    event_name = context.user_data["event_name"]

    db.insert_user_feedback(event_name, username, user_input)
    db.query_user_feedback(event_name)

    text = "Thank you for your message! We will feedback RC4 Welfare Committee."
    text2 = "Welcome home. Feel free to access the features below!"
    update.message.reply_text(text=text)
    update.message.reply_text(
        text=text2, reply_markup=keyboards.main_options_keyboard())

    return ConversationHandler.END


# def get_event_feedback(update, context, event):
#     print(event)
