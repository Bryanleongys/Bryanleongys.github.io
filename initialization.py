from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove
import keyboards

def start(update, context):
    chat_id = update.message.chat.id
    username = update.message.from_user.username

    text = "Hi @" + username + "! Let's get you started!"
    text2 = "May I know your name (full name on matric card)?"

    update.message.reply_text(text)
    update.message.reply_text(text2)

    return 1


def get_name(update, context):
    chat_id = update.message.chat.id
    user_input = update.message.text

    text = "Your name " + user_input + " has been registered."
    text2 = "Please enter the last 3-digits of your matric number. (e.g. 02M)"

    update.message.reply_text(text)
    update.message.reply_text(text2)

    return 2


def get_matric(update, context):
    chat_id = update.message.chat.id
    user_input = update.message.text

    text = "The last 3-digits of your matric number, " + \
        user_input + ", has been registered."
    text2 = "Please select your house."

    update.message.reply_text(text)
    update.message.reply_text(text2, reply_markup=keyboards.house_keyboard())

    return 3


def get_house(update, context):
    chat_id = update.message.chat.id
    user_input = update.message.text

    text = "Great! Your house, " + user_input + ", has been registered."
    text2 = "Welcome to RC4 Welfare Telegram Bot! Feel free to access the features below!"

    update.message.reply_text(text)
    update.message.reply_text(text=text2, reply_markup=keyboards.main_options_keyboard())

    return ConversationHandler.END