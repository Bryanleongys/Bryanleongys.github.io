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
    # Initialize arrays
    # Past Welfare
    db.insert_events(
        "Orientation Welfare", "22/07/2021", "23/07/2021", "25/07/2021", 1400, 1700, 1, "70% Sugar")
    # Current Welfare
    db.insert_events("Sem 2 Welfare",
                     "25/07/2021", "28/07/2021", "26/11/2021", 800, 1200, 1, "Acai")
    db.insert_events("Holiday Welfare",
                     "26/07/2021", "29/07/2021", "26/11/2021", 1300, 1700, 0, "")
    # Future Welfare
    db.insert_events(
        "Recess Week Welfare", "03/10/2021", "13/10/2021", "08/10/2021", 1200, 1700, 0, "")
    db.insert_events("Finals Week Welfare",
                     "21/11/2021", "29/11/2021", "26/11/2021", 800, 1200, 0, "")
    db.query_all_events()
    # current_events
    current_events = db.query_all_current_events()
    current_events_array = []
    current_events_name_array = []
    timings_array = []
    event_date_array = []
    event_items_array = []
    items_bool_array = []
    for event in current_events:
        current_events_array.append(event[0] + ", closes " + event[2])
        current_events_name_array.append(event[0])
        timings_array.append([event[4], event[5]])
        event_date_array.append(event[3])
        items_bool_array.append(event[6])
        event_items_array.append(event[7])

    # future_events
    future_events = db.query_all_future_events()
    future_events_array = []
    for event in future_events:
        future_events_array.append(
            event[0] + ", " + event[1])

    # feedback_events
    feedback_events = db.query_all_past_events()
    feedback_events_array = []
    for event in feedback_events:
        feedback_events_array.append(event[0])

    # Welfare Events
    # Current welfare events
    dp.add_handler(ConversationHandler(
        entry_points=[CallbackQueryHandler(partial(
            signup.show_current_welfare, events_array=current_events_array), pattern="current_welfare")],
        states={
            1: [CallbackQueryHandler(partial(signup.show_timings, timings=timings_array, event_dates=event_date_array, events=current_events_name_array, items_bool_array=items_bool_array), pattern="current")],
            2: [CallbackQueryHandler(partial(signup.show_item_events, event_items_array=event_items_array))],
            3: [CallbackQueryHandler(partial(signup.confirm_timing, db=db, items_bool_array=items_bool_array), pattern="timing")]
        },
        fallbacks=[CallbackQueryHandler(
            signup.prompt_welfare, pattern="return_prompt"), CallbackQueryHandler(
            partial(
                signup.show_current_welfare, events_array=current_events_array), pattern="return_current")],
        per_user=False
    ))

    # Future welfare events
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
            fallbacks=[CallbackQueryHandler(
                feedback.prompt_feedback, pattern="return_feedback")],
            per_user=False
        )
    )

    # Events feedback
    # dp.add_handler(CallbackQueryHandler(partial(
    #     feedback.show_feedback_events, events_array=feedback_events_array), pattern="event_feedback"))

    # counter = 0
    # for event in feedback_events_array:
    #     dp.add_handler(
    #         ConversationHandler(
    #             entry_points=[CallbackQueryHandler(partial(
    #                 feedback.get_event_feedback, event=event), pattern="fevents"+str(counter))],
    #             states={
    #                 1: [MessageHandler(Filters.text, feedback.confirm_general_feedback)],
    #             },
    #             fallbacks=[],
    #             per_user=False
    #         )
    #     )
    #     counter += 1
    dp.add_handler(
        ConversationHandler(
            entry_points=[CallbackQueryHandler(partial(
                feedback.show_feedback_events, events_array=feedback_events_array), pattern="event_feedback")],
            states={
                1: [CallbackQueryHandler(partial(
                    feedback.get_event_feedback, events=feedback_events_array), pattern="fevent")],
                2: [MessageHandler(Filters.text, feedback.confirm_general_feedback)],
            },
            fallbacks=[CallbackQueryHandler(feedback.prompt_feedback, pattern="return_prompt"), CallbackQueryHandler(
                partial(
                    feedback.show_feedback_events, events_array=feedback_events_array), pattern="return_events")],
            per_user=False
        )
    )

    # Other additionals
    dp.add_handler(CallbackQueryHandler(
        show_home, pattern='back_home'))

    updater.start_polling()
    updater.idle()


main()
