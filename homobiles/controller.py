import json
from termcolor import cprint

def func(_lambda, *args):
    return _lambda(*args)

def PARSE_CONFIG(config):
    return [
        func((lambda token: {
            # HTTP method type (GET or POST)
            "method": token[0],
            # Return data type (should be a class or type)
            "return_type": token[1],
            # Authorization in HTTP_AUTHORIZATION header format.
            "auth": func((lambda x: func((lambda x: {
                "user": x[0].strip("["),
                "pass": x[1].strip(":"),
                }), x.split("]"))
                if x.lower() != "none" else None),token[2]),
            # Name of the function.
            "command": " ".join(token[3:]).split("(")[0],
            # Static function declaration (type, name).
            "params": [func((lambda x:{
                "type": x[0],
                "name": x[1],
                }), pair.strip(" ").split(" ") )
                # Questionmark means not implemented so empty parameters.
                if pair != "...?" and pair != "" else {}
                for pair in " ".join(token[3:]).split("(")[1].replace(")","").split(",")
            ]}),line.split()
        )
        for line in [" ".join(line.split()) for line in list(
            # Remove empty lines and extra spaces so we can tokenize by spaces.
            filter(lambda line: (len(line) != 0 and len(line.replace(" ","")) != 0),
                # Split by new lines.
                config.split("\n")))]
    ]

if __name__ == "__main__":

    # Riders Admin
    config = """
POST    Error               [rider]:session     report_a_ride(str message)
POST    Error               [rider]:session     report_a_lost_item(str message)
GET     page                None                load_about_us_page()
GET     page                None                load_help_menu()
GET     page                None                load_report_a_ride_form()
GET     page                None                load_report_a_lost_item_form()
GET     page                None                load_how_payment_works_page()
GET     page                None                load_how_do_free_rides_work_page()
GET     page                None                load_saftey_page()
GET     page                None                load_policies_page()
GET     page                None                load_legal_page()
    """
    CONFIG = PARSE_CONFIG(config)
    cprint(config, "blue")
    cprint(json.dumps(CONFIG,indent=4,sort_keys=True),"green")

    # Riders Account
    config = """
POST    Error               [rider]:session     add_phone_number(int phone_number)
POST    bool                [rider]:session     verify_phone_number_verification_code(int verification_code)
POST    Error               [rider]:session     register_account_payment_method_paypal(...?)
POST    Error               [rider]:session     register_account_payment_method_credit_card(int credit_card_number, int exp_month, int exp_year, int zip_code, int cvv)
POST    Error               [rider]:session     register_account_payment_method_apple_pay(...?)
POST    Error               [rider]:session     save_profile(str name, str pronoun, str accomodations, str photo_filename)
POST    Error               [rider]:session     add_trusted_contact(str contact_name, int contact_phone_number)
POST    Error               [rider]:session     register_account_payment_method_credit_card(int credit_card_number, int exp_month, int exp_year, int zip_code, int cvv)
POST    Document            [rider]:session     request_tax_deductable_reciept(str email_address)
POST    Error               [rider]:session     update_email_address(str email_address)
POST    Error               [rider]:session     add_accessibility_requirements(int accessibility_requirment_key)
POST    Error               [rider]:session     remove_accessibility_requirements(int accessibility_requirment_key)
POST    Error               [rider]:session     update_phone_number(int phone_number)
POST    bool                [rider]:session     verify_phone_number_verification_code(int verification_code)
POST    Error               [rider]:session     log_out()
POST    Error               [rider]:session     unregister()
GET     []Location          [rider]:session     get_bookmark_locations()
GET     []Location          [rider]:session     get_bookmark_locations()
GET     Error               [rider]:session     verify_account_is_rider_ready()
GET     Account             [rider]:session     load_account()
GET     Profile             [rider]:session     load_profile()
GET     []Contact           [rider]:session     load_trusted_contacts()
GET     []Ride              [rider]:session     load_past_rides(int limit, int offset)
GET     []Ride              [rider]:session     load_past_rides(int limit, int offset)
GET     Settings            [rider]:session     load_settings()
    """
    CONFIG = PARSE_CONFIG(config)
    cprint(config, "blue")
    cprint(json.dumps(CONFIG,indent=4,sort_keys=True),"green")

    # Riders Logging
    config = """
POST    void                [rider]:session     log_user_error(Error error)
POST    void                [rider]:session     log_user_error(Error error)
POST    void                [rider]:session     indicate_allowed_location_access(bool allowed)
POST    void                [rider]:session     log_location_permission_change(bool on)
POST    void                [rider]:session     log_contacts_permission_change(bool on)
POST    void                [rider]:session     log_notifications_permission_change(bool on)
POST    void                [rider]:session     log_share_trip_status(RideToken ride_token, float lat, float lng)
POST    void                [rider]:session     log_911_assistance_opened(RideToken ride_token, float lat, float lng) 
POST    void                [rider]:session     log_911_assistance_called(RideToken ride_token, float lat, float lng)
POST    Error               [rider]:session     log_trusted_contact_message(str trip_status, str contact_name, int contact_number, str text_msg, bool free_ride_sent)
GET     Error               None                pre_flight_checks(str auth_username, str auth_session)
    """
    CONFIG = PARSE_CONFIG(config)
    cprint(config, "blue")
    cprint(json.dumps(CONFIG,indent=4,sort_keys=True),"green")

    # Riders Payments
    config = """
POST    PaymentToken        [rider]:session     initialize_one_time_donation(int donation_amount, bool round_up)
POST    Error               [rider]:session     confirm_one_time_donation_paypal(PaymentToken payment_token)
POST    Error               [rider]:session     confirm_one_time_donation_credit_card(PaymentToken payment_token)
POST    Error               [rider]:session     add_a_driver_tip(Ride ride, int tip_amount)
POST    Error               [rider]:session     leave_driver_tip(RideToken ride_token, int tip_amount)
    """
    CONFIG = PARSE_CONFIG(config)
    cprint(config, "blue")
    cprint(json.dumps(CONFIG,indent=4,sort_keys=True),"green")

    # Riders Rides
    config = """
POST    Location            [rider]:session     search_location_query(str location_query)
POST    RideToken           [rider]:session     request_ride(float start_lat, float start_lng, float end_lat, float end_lng, int time_from_now)
POST    Location            [rider]:session     search_location_query(str location_query)
POST    RideToken           [rider]:session     request_ride(float start_lat, float start_lng, float end_lat, float end_lng, int time_from_now)
POST    Error               [rider]:session     confirm_ride_requet(RideToken ride_token)
POST    Error               [rider]:session     post_live_ride_pickup_note(str pickup_note)
POST    Error               [rider]:session     cancel_ride(RideToken ride_token)
POST    Location            [rider]:session     search_location_query(str location_query)
POST    Error               [rider]:session     edit_ride_destination(RideToken ride_token, float lat, float lng)
POST    Error               [rider]:session     share_trip_status(RideToken ride_token, float lat, float lng)
POST    Error               [rider]:session     post_ride_feedback(RideToken ride_token, str ride_feedback)
POST    Error               [rider]:session     post_last_ride_message_to_driver(RideToken ride_token, str ride_feedback)
POST    Error               [rider]:session     rate_ride(RideToken ride_token, ride_rating ride_rating)
GET     bool                [rider]:session     check_current_location_availibility(float lat, float lng)
GET     RideEstimate        [rider]:session     load_ride_request_estimate(RideToken ride_token)
GET     LiveRide            [rider]:session     load_live_ride(RideToken ride_token)
GET     LiveRide            [rider]:session     load_live_ride(RideToken ride_token)
GET     LiveRide            [rider]:session     load_live_ride(RideToken ride_token)
GET     LiveRide            None                share_trip_status(RideToken ride_token, float lat, float lng)
    """
    CONFIG = PARSE_CONFIG(config)
    cprint(config, "blue")
    cprint(json.dumps(CONFIG,indent=4,sort_keys=True),"green")
