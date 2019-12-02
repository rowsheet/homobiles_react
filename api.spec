// API Test
// import api_test.api.v1

POST    Error               None                v1.api_test.api_test.api_test(str value)
POST    Error               None                v1.api_test.api_test.dump_args()

// API Test (Missing)

POST    Error               None                v1.api_test.api_test.missing()
POST    Error               None                v1.api_test.missing.api_test()
POST    Error               None                v1.missing.api_test.api_test()

// Riders Account
// import rider.api.v1

POST    Error               [rider]:session     v1.rider.account.add_phone_number(int phone_number)
POST    bool                [rider]:session     v1.rider.account.verify_phone_number_verification_code(int verification_code)
POST    Error               [rider]:session     v1.rider.payment_methods.register_account_payment_method_paypal(...?)
POST    Error               [rider]:session     v1.rider.payment_methods.register_account_payment_method_credit_card(int credit_card_number, int exp_month, int exp_year, int zip_code, int cvv)
POST    Error               [rider]:session     v1.rider.payment_methods.register_account_payment_method_apple_pay(...?)
POST    Error               [rider]:session     v1.rider.profile.save_profile(str name, str pronoun, str accomodations, str photo_filename)
POST    Error               [rider]:session     v1.rider.contacts.add_trusted_contact(str contact_name, int contact_phone_number)
POST    Document            [rider]:session     v1.rider.tax_reciepts.request_tax_deductable_reciept(str email_address)
POST    Error               [rider]:session     v1.rider.account.update_email_address(str email_address)
POST    Error               [rider]:session     v1.rider.accessibility_requirment.add_accessibility_requirements(int accessibility_requirment_key)
POST    Error               [rider]:session     v1.rider.accessibility_requirment.remove_accessibility_requirements(int accessibility_requirment_key)
POST    Error               [rider]:session     v1.rider.acount_info.update_phone_number(int phone_number)
POST    Error               [rider]:session     v1.rider.auth.iog_out()
POST    Error               [rider]:session     v1.rider.auth.unregister()
GET     []Location          [rider]:session     v1.rider.bookmark_locations.get_bookmark_locations()
GET     Error               [rider]:session     v1.rider.profile.verify_account_is_rider_ready()
GET     Account             [rider]:session     v1.rider.count.load_account()
GET     Profile             [rider]:session     v1.rider.profile.load_profile()
GET     []Contact           [rider]:session     v1.rider.contacts.load_trusted_contacts()
GET     []Ride              [rider]:session     v1.rider.rides.load_past_rides(int limit, int offset)
GET     Settings            [rider]:session     v1.rider.settings.load_settings()

// Riders Logging
// import rider.api.v1

POST    void                [rider]:session     v1.rider.event_log.log_user_error(Error error)
POST    void                [rider]:session     v1.rider.event_log.log_location_permission_change(bool on)
POST    void                [rider]:session     v1.rider.event_log.log_contacts_permission_change(bool on)
POST    void                [rider]:session     v1.rider.event_log.log_notifications_permission_change(bool on)
POST    void                [rider]:session     v1.rider.event_log.log_share_trip_status(RideToken ride_token, float lat, float lng)
POST    void                [rider]:session     v1.rider.event_log.log_911_assistance_opened(RideToken ride_token, float lat, float lng) 
POST    void                [rider]:session     v1.rider.event_log.log_911_assistance_called(RideToken ride_token, float lat, float lng)
POST    Error               [rider]:session     v1.rider.event_log.log_trusted_contact_messaged(str trip_status, str contact_name, int contact_number, str text_msg, bool free_ride_sent)
GET     Error               [rider]:session     v1.rider.event_log.pre_flight_checks(str auth_username, str auth_session)

// Riders Payments
// import rider.api.v1

POST    PaymentToken        [rider]:session     v1.rider.donations.initialize_one_time_donation(int donation_amount, bool round_up)
POST    Error               [rider]:session     v1.rider.payments.confirm_one_time_donation_paypal(PaymentToken payment_token)
POST    Error               [rider]:session     v1.rider.payments.confirm_one_time_donation_credit_card(PaymentToken payment_token)
POST    Error               [rider]:session     v1.rider.payments.add_a_driver_tip(RideToken ride_token, int tip_amount)

// RideShare
// import rideshare.api.v1

POST    Location            [rider]:session     v1.rideshare.utils.search_location_query(str location_query)
POST    RideToken           [rider]:session     v1.rideshare.manifest.request_ride(float start_lat, float start_lng, float end_lat, float end_lng, int time_from_now)
POST    Error               [rider]:session     v1.rideshare.manifest.post_live_ride_pickup_note(str pickup_note)
POST    Error               [rider]:session     v1.rideshare.queue.cancel_ride(RideToken ride_token)
POST    Error               [rider]:session     v1.rideshare.social.share_trip_status(RideToken ride_token, float lat, float lng)
POST    Error               [rider]:session     v1.rideshare.ride_feedback.post_ride_feedback(RideToken ride_token, str ride_feedback)
POST    Error               [rider]:session     v1.rideshare.rider_driver_messages.post_last_ride_message_to_driver(RideToken ride_token, str ride_feedback)
POST    Error               [rider]:session     v1.rideshare.manifest.rate_ride(RideToken ride_token, ride_rating ride_rating)
GET     Error               [rider]:session     v1.rideshare.manifest.load_ride_status(RideToken ride_token)
GET     bool                [rider]:session     v1.rideshare.util.check_current_location_availibility(float lat, float lng)
GET     RideEstimate        [rider]:session     v1.rideshare.manifest.load_ride_request_estimate(RideToken ride_token)
GET     LiveRide            [rider]:session     v1.rideshare.util.load_live_ride(RideToken ride_token)
