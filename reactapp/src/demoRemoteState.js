var demoRemoteState = {
    /*--------------------------------------------------------------------------
     * DEMO
    --------------------------------------------------------------------------*/
    DemoItemList: {
        use_border: true,
        use_thumbnail: true,
        use_button: true,
        items: [
            {
                type: "item",
                title: "Title Foo PLUS SOME REALLY LONG TEXT TO OVERFLOW",
                sub_title: "Sub-Title Foo PLUS SOME REALLY LONG TEXT TO OVERFLOW",
                thumbnail: {
                    type: "fa_icon",
                    data: "fa-road",
                },
                button: {
                    icon: "fa-plus",
                    text: "expand",
                },
            },
            {
                type: "item",
                title: "Title Bar",
                sub_title: "Sub-Title Bar",
                thumbnail: {
                    type: "letters",
                    data: "A",
                },
                button: {
                    icon: "fa-plus",
                },
            },
            {
                type: "item",
                title: "Title Baz",
                sub_title: "Sub-Title Baz",
                thumbnail: {
                    type: "image",
                    data: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
                },
            },
            {
                type: "item",
                title: "Title Only",
                thumbnail: {
                    type: "letters",
                    data: "TO",
                },
            },
            {
                type: "item",
                title: "Title Only",
                thumbnail: {
                    type: "letters",
                    data: "TO",
                },
            },
            {
                type: "spacer",
                title: "Spacer",
            },
        ],
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
