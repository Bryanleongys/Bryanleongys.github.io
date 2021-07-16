import Constants as keys
import keyboards
import initialization
import signup
import feedback
import settings
from telegram.ext import *
from telegram import InlineKeyboardMarkup, InlineKeyboardButton, ParseMode, ReplyKeyboardMarkup, KeyboardButton, Message, Bot, ReplyKeyboardRemove
from functools import partial

print("Bot started...")


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
                3: [MessageHandler(Filters.text, initialization.get_house)]
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

    # Input events_array and timings_array based on event and time
    current_events_array = ["Wowza Day", "Be Yourself Day", "Hello Day"]
    timings_array = [[1500, 1800], [1400, 1600], [1000, 1200]]

    # Welfare Events
    # Current welfare events
    dp.add_handler(CallbackQueryHandler(partial(
        signup.show_current_welfare, events_array=current_events_array), pattern="current_welfare"))

    counter = 0
    for event in current_events_array:
        dp.add_handler(CallbackQueryHandler(partial(
            signup.show_timings, timings=timings_array[counter], event=event), pattern=("current_event"+str(counter))))
        counter += 1

    # Future welfare events
    future_events_array = ["Hello World, 28 May, 6pm",
                           "Make World, 29 May, 7pm", "Boo, 30 May, 8pm"]
    dp.add_handler(CallbackQueryHandler(partial(
        signup.show_future_welfare, events_array=future_events_array), pattern="future_welfare"))

    # Feedback
    # General feedback
    dp.add_handler(
        ConversationHandler(
            entry_points=[CallbackQueryHandler(
                feedback.get_general_feedback, pattern="general_feedback")],
            states={
                1: [MessageHandler(Filters.text, feedback.confirm_general_feedback)],
            },
            fallbacks=[],
            per_user=False
        )
    )

    # Events feedback
    feedback_events_array = ["Amazing Day", "Wow Day", "Booya Day"]
    dp.add_handler(CallbackQueryHandler(partial(
        feedback.show_feedback_events, events_array=feedback_events_array), pattern="event_feedback"))

    counter = 0
    for event in feedback_events_array:
        dp.add_handler(
            ConversationHandler(
                entry_points=[CallbackQueryHandler(partial(
                    feedback.get_event_feedback, event=event), pattern="fevents"+str(counter))],
                states={
                    1: [MessageHandler(Filters.text, feedback.confirm_general_feedback)],
                },
                fallbacks=[],
                per_user=False
            )
        )
        counter += 1

    # Other additionals
    dp.add_handler(CallbackQueryHandler(
        show_home, pattern='back_home'))

    updater.start_polling()
    updater.idle()


main()
