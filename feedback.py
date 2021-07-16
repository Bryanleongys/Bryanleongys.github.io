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
    )
    return 1


def confirm_general_feedback(update, context):
    chat_id = update.message.chat.id
    user_input = update.message.text

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
    return ConversationHandler.END


def get_event_feedback(update, context, event):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Thank you. What feedback would you like to give for " + event + " ?"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
    )
    return 1


# def get_event_feedback(update, context, event):
#     print(event)
