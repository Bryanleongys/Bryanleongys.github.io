import keyboards
import initialization
from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove


def prompt_welfare(update, context):
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
    return ConversationHandler.END


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


def show_timings(update, context, timings, event):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Select time slot to sign up for " + event + "."
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.timings_keyboard(timings)
    )
    return ConversationHandler.END


def return_home(update, context):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Your timeslot has been selected."
    text2 = "Welcome home. Feel free to access the features below!"

    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
    )

    update.message.reply_text(
        text=text2, reply_markup=keyboards.main_options_keyboard())

    return ConversationHandler.END
