from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove
import keyboards


def start(update, context):
    chat_id = update.message.chat.id
    username = str(update.message.from_user.username)
    context.user_data["telegram_handle"] = username

    text = "Hi @" + username + "! Let's get you started!"
    text2 = "May I know your name (full name on matric card)?"

    update.message.reply_text(text)
    update.message.reply_text(text2)

    return 1


def get_name(update, context):
    chat_id = update.message.chat.id
    user_input = update.message.text
    context.user_data["full_name"] = user_input

    text = "Your name " + user_input + " has been registered."
    text2 = "Please enter the last 3-digits of your matric number. (e.g. 02M)"

    update.message.reply_text(text)
    update.message.reply_text(text2)

    return 2


def get_matric(update, context):
    chat_id = update.message.chat.id
    user_input = update.message.text
    context.user_data["nusnet_id"] = user_input

    text = "The last 3-digits of your matric number, " + \
        user_input + ", has been registered."
    text2 = "Please select your house."

    update.message.reply_text(text)
    update.message.reply_text(text2, reply_markup=keyboards.house_keyboard())

    return 3


def get_house(update, context, db):
    chat_id = update.message.chat.id
    user_input = update.message.text
    telegram_handle = context.user_data["telegram_handle"]
    full_name = context.user_data["full_name"]
    nusnet_id = context.user_data["nusnet_id"]

    db.insert_user(full_name, nusnet_id, user_input, chat_id)
    db.query_all_users()

    text = "Great! Your house, " + user_input + ", has been registered."
    text2 = "Welcome to RC4 Welfare Telegram Bot! Feel free to access the features below!"

    update.message.reply_text(text)
    update.message.reply_text(
        text=text2, reply_markup=keyboards.main_options_keyboard())

    return ConversationHandler.END
