import keyboards, initialization, signup, feedback
from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove

USER_NAME = 0
NUSNET_ID = 1
HOUSE = 2

def prompt_settings(update, context):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Please select the following options:"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.settings_keyboard()
    )

def get_account_details(update, context, db):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    user_details = db.query_user_details(chat_id)

    text = "Following are your details:\nName: " + user_details[USER_NAME] + "\nNUSNET ID: " + user_details[NUSNET_ID] + "\nHouse: " + user_details[HOUSE] + "\n\nPlease press /start to re-initialize your account details."
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.account_details_back()
    )