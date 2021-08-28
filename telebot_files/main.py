import Constants as keys
import keyboards
import initialization
import signup
import feedback
import settings
from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove
from functools import partial
from database import Database

print("Bot started...")
db = Database()
db.create_tables()


def show_home(update, context):
    query = update.callback_query
    chat_id = query.message.chat_id
    message_id = query.message.message_id

    text = "Welcome home. Feel free to access the features below!"
    context.bot.edit_message_text(
        chat_id=chat_id,
        message_id=message_id,
        text=text,
        reply_markup=keyboards.main_options_keyboard()
    )

    return ConversationHandler.END

# def send_msg(chat_id, text):
#     token = keys.API_KEY
#     chat_id = chat_id
#     url_req = "https://api.telegram.org/bot" + token + "/sendMessage" + "?chat_id=" + str(chat_id) + "&text=" + text 
#     results = requests.get(url_req)
#     print(results.json())


def error(update, context):
    print("error")


def main():
    updater = Updater(keys.API_KEY)
    dp = updater.dispatcher
    # Conversation for initialization
    dp.add_handler(
        ConversationHandler(
            entry_points=[CommandHandler("start", initialization.start)],
            states={
                1: [MessageHandler(Filters.text, initialization.get_name)],
                2: [MessageHandler(Filters.text, initialization.get_matric)],
                3: [MessageHandler(Filters.text, partial(initialization.get_house, db=db))]
            },
            fallbacks=[],
            per_user=False
        )
    )

    # Mainkeyboard Options
    dp.add_handler(CallbackQueryHandler(
        signup.prompt_welfare, pattern='welfare_events'))

    dp.add_handler(CallbackQueryHandler(
        feedback.prompt_feedback, pattern='feedback'))

    dp.add_handler(CallbackQueryHandler(
        settings.prompt_settings, pattern='settings'
    ))

    # Welfare Events
    # Current welfare events
    dp.add_handler(ConversationHandler(
        entry_points=[CallbackQueryHandler(partial(
            signup.show_current_welfare, db=db), pattern="current_welfare")],
        states={
            1: [CallbackQueryHandler(partial(signup.show_timings, db=db), pattern="current")],
            2: [CallbackQueryHandler(partial(signup.show_item_events, db=db), pattern="timing")],
            3: [CallbackQueryHandler(partial(signup.confirm_timing, db=db), pattern="timing")]
        },
        fallbacks=[CallbackQueryHandler(
            signup.prompt_welfare, pattern="return_prompt"), CallbackQueryHandler(
            partial(signup.show_timings, db=db), pattern="return_back"), CallbackQueryHandler(
            partial(
                signup.show_current_welfare, db=db), pattern="return_current")],
        per_user=False
    ))

    # Future welfare events
    dp.add_handler(CallbackQueryHandler(partial(
        signup.show_future_welfare, db=db), pattern="future_welfare"))

    # Feedback
    # General feedback
    dp.add_handler(
        ConversationHandler(
            entry_points=[CallbackQueryHandler(
                feedback.get_general_feedback, pattern="general_feedback")],
            states={
                1: [MessageHandler(Filters.text, partial(feedback.confirm_general_feedback, db=db))],
            },
            fallbacks=[CallbackQueryHandler(
                feedback.prompt_feedback, pattern="return_feedback")],
            per_user=False
        )
    )

    # Events Feedback
    dp.add_handler(
        ConversationHandler(
            entry_points=[CallbackQueryHandler(partial(
                feedback.show_feedback_events, db=db), pattern="event_feedback")],
            states={
                1: [CallbackQueryHandler(partial(
                    feedback.get_event_feedback), pattern="fevent")],
                2: [MessageHandler(Filters.text, partial(feedback.confirm_event_feedback, db=db))],
            },
            fallbacks=[CallbackQueryHandler(feedback.prompt_feedback, pattern="return_prompt"), CallbackQueryHandler(
                partial(
                    feedback.show_feedback_events, db=db), pattern="return_events")],
            per_user=False
        )
    )

    # Settings
    dp.add_handler(CallbackQueryHandler(partial(
        settings.get_account_details, db=db), pattern="account_details"))

    # Other additionals
    dp.add_handler(CallbackQueryHandler(
        show_home, pattern='back_home'))

    updater.start_polling()
    updater.idle()


main()
