"""

POST    error               riders.admin.report_a_ride(string message)
POST    error               riders.admin.report_a_lost_item(string message)
GET     page                riders.admin.load_about_us_page()
GET     page                riders.admin.load_help_menu()
GET     page                riders.admin.load_report_a_ride_form()
GET     page                riders.admin.load_report_a_lost_item_form()
GET     page                riders.admin.load_how_payment_works_page()
GET     page                riders.admin.load_how_do_free_rides_work_page()
GET     page                riders.admin.load_saftey_page()
GET     page                riders.admin.load_policies_page()
GET     page                riders.admin.load_legal_page()

POST    error               riders.account.add_phone_number(int phone_number)
POST    bool                riders.account.verify_phone_number_verification_code(int verification_code)
POST    error               riders.account.register_account_payment_method_paypal(...?)
POST    error               riders.account.register_account_payment_method_credit_card(int credit_card_number, int exp_month, int exp_year, int zip_code, int cvv)
POST    error               riders.account.register_account_payment_method_apple_pay(...?)
POST    error               riders.account.save_profile(string name, string pronoun, string accomodations, string photo_filename)
POST    error               riders.account.add_trusted_contact(string contact_name, int contact_phone_number)
POST    error               riders.account.register_account_payment_method_credit_card(int credit_card_number, int exp_month, int exp_year, int zip_code, int cvv)
POST    document            riders.account.request_tax_deductable_reciept(string email_address)
POST    error               riders.account.update_email_address(string email_address)
POST    error               riders.account.add_accessibility_requirements(int accessibility_requirment_key)
POST    error               riders.account.remove_accessibility_requirements(int accessibility_requirment_key)
POST    error               riders.account.update_phone_number(int phone_number)
POST    bool                riders.account.verify_phone_number_verification_code(int verification_code)
POST    error               riders.account.log_out()
POST    error               riders.account.unregister()
GET     []location          riders.account.get_bookmark_locations()
GET     []location          riders.account.get_bookmark_locations()
GET     error               riders.account.verify_account_is_rider_ready()
GET     account             riders.account.load_account()
GET     profile             riders.account.load_profile()
GET     []contact           riders.account.load_trusted_contacts()
GET     []ride              riders.account.load_past_rides(int limit, int offset)
GET     []ride              riders.account.load_past_rides(int limit, int offset)
GET     settings            riders.account.load_settings()

POST    void                riders.monitoring.log_user_error(error error)
POST    void                riders.monitoring.log_user_error(error error)
POST    void                riders.monitoring.indicate_allowed_location_access(bool allowed)
POST    void                riders.monitoring.log_location_permission_change(bool on)
POST    void                riders.monitoring.log_contacts_permission_change(bool on)
POST    void                riders.monitoring.log_notifications_permission_change(bool on)
POST    void                riders.monitor.log_share_trip_status(ride_request_token ride_request_token, float lat, float lng)
POST    void                riders.monitor.log_911_assistance_opened(ride_request_token ride_request_token, float lat, float lng) 
POST    void                riders.monitor.log_911_assistance_called(ride_request_token ride_request_token, float lat, float lng)
POST    error               riders.monitoring.log_trusted_contact_message(trip_status trip_status, string contact_name, int contact_number, string text_msg, bool free_ride_sent)
GET     error               riders.monitoring.pre_flight_checks()

POST    pymt_token          riders.payments.initialize_one_time_donation(int donation_amount, bool round_up)
POST    error               riders.payments.confirm_one_time_donation_paypal(pymt_token payment_token)
POST    error               riders.payments.confirm_one_time_donation_credit_card(pymt_token payment_token)
POST    error               riders.payments.add_a_driver_tip(ride ride, int tip_amount)
POST    error               riders.payments.leave_driver_tip(ride_request_token ride_request_token, int tip_amount)

POST    location            riders.rides.search_location_query(string location_query)
POST    ride_request_token  riders.rides.request_ride(float start_lat, float start_lng, float end_lat, float end_lng, int time_from_now)
POST    location            riders.rides.search_location_query(string location_query)
POST    ride_request_token  riders.rides.request_ride(float start_lat, float start_lng, float end_lat, float end_lng, int time_from_now)
POST    error               riders.rides.confirm_ride_requet(ride_request_token ride_request_token)
POST    error               riders.rides.post_live_ride_pickup_note(string pickup_note)
POST    error               riders.rides.cancel_ride(ride_request_token ride_request_token)
POST    location            riders.rides.search_location_query(string location_query)
POST    error               riders.rides.edit_ride_destination(ride_request_token ride_request_token, float lat, float lng)
POST    error               riders.rides.share_trip_status(ride_request_token ride_request_token, float lat, float lng)
POST    error               riders.rides.post_ride_feedback(ride_request_token ride_request_token, string ride_feedback)
POST    error               riders.rides.post_last_ride_message_to_driver(ride_request_token ride_request_token, string ride_feedback)
POST    error               riders.rides.rate_ride(ride_request_token ride_request_token, ride_rating ride_rating)
GET     bool                riders.rides.check_current_location_availibility(float lat, float lng)
GET     ride_estimate       riders.rides.load_ride_request_estimate(ride_request_token ride_request_token)
GET     live_ride           riders.rides.load_live_ride(ride_request_token ride_request_token)
GET     live_ride           riders.rides.load_live_ride(ride_request_token ride_request_token)
GET     live_ride           riders.rides.load_live_ride(ride_request_token ride_request_token)
GET     live_ride           riders.rides.share_trip_status(ride_request_token ride_request_token, float lat, float lng)

"""

"""
    '", RiderAdmin.
        .(string message)
report_a_lost_item(string message)
load_about_us_page()
load_help_menu()
load_report_a_ride_form()
load_report_a_lost_item_form()
load_how_payment_works_page()
load_how_do_free_rides_work_page()
load_saftey_page()
load_policies_page()
load_legal_page()
"""

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.urls import path
from django.conf.urls import url

@csrf_exempt
def report_a_ride(request):
    return JsonResponse({
            "data": ("REQUEST A RIDE TEST")
        },status=200)

admin_urls = [
    path("report_a_ride/", report_a_ride),
]

urlpatterns = [
    path("report_a_ride/", report_a_ride),
    # url(r"^admin/", admin_urls),
    """
    url(r"^accounts/", include("allauth.urls")),
    url(r"^monitoring/", include("allauth.urls")),
    url(r"^payments/", include("allauth.urls")),
    url(r"^rides/", include("allauth.urls")),
    """
]

@csrf_exempt
def riders_api(request):
    url = request.path
    return JsonResponse({
            "fuck": "you",
            "url": url,
        },status=200)
