var demoRemoteState = {
    /*--------------------------------------------------------------------------
     * DEMO
    --------------------------------------------------------------------------*/
    DemoItemList: {
        // @TODO Build the data structures first.
    },
    /*--------------------------------------------------------------------------
     * RIDER
    --------------------------------------------------------------------------*/
    RiderSidebar: {
        username: "John Smith",
        pronouns: "they/them/theirs",
        footer: {
            key: "switch_to_driving",
            title: "Switch to driving",
            icon: "fa-road",
        },
        items: [
            {
                key: "request_a_ride",
                title: "request a ride",
                icon: "fa-car",
                active: true,
            },
            {
                key: "past_rides",
                title: "past rides",
                icon: "fa-car-side",
                active: false,
            },
            {
                key: "my_account",
                title: "my account",
                icon: "fa-user-circle",
                active: false,
            },
            {
                key: "payment_methods",
                title: "payment methods",
                icon: "fa-credit-card",
                active: false,
            },
            {
                key: "donation_station",
                title: "donation station",
                icon: "fa-heart",
                active: false,
            },
            {
                key: "settings",
                title: "settings",
                icon: "fa-cog",
                active: false,
            },
            {
                key: "become_a_driver",
                title: "become a driver",
                icon: "fa-car-alt",
                active: false,
            },
            {
                key: "about_homobiles",
                title: "about homobiles",
                icon: "fa-heading",
                active: false,
            },
            {
                key: "help",
                title: "help",
                icon: "fa-question-circle",
                active: false,
            },
        ],
    },
}

export default demoRemoteState;
