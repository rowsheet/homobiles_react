import React from "react";

/*--------------------------------------------------------------------------
 ██████╗ ██████╗ ██╗██╗   ██╗███████╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██║██║   ██║██╔════╝██╔══██╗██╔════╝
 ██║  ██║██████╔╝██║██║   ██║█████╗  ██████╔╝███████╗
 ██║  ██║██╔══██╗██║╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║
 ██████╔╝██║  ██║██║ ╚████╔╝ ███████╗██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝
--------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------
 ██████╗ ██╗██████╗ ███████╗██████╗ ███████╗
 ██╔══██╗██║██╔══██╗██╔════╝██╔══██╗██╔════╝
 ██████╔╝██║██║  ██║█████╗  ██████╔╝███████╗
 ██╔══██╗██║██║  ██║██╔══╝  ██╔══██╗╚════██║
 ██║  ██║██║██████╔╝███████╗██║  ██║███████║
 ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
--------------------------------------------------------------------------*/

import RiderSidebar from './views/RiderSidebar';
import Foo from './views/Foo';
import Bar from './views/Bar';
import Baz from './views/Baz';

/*--------------------------------------------------------------------------
 ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ ██████╗ ███╗   ██╗
██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔═══██╗████╗  ██║
██║     ██║   ██║██╔████╔██║██╔████╔██║██║   ██║██╔██╗ ██║
██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██║   ██║██║╚██╗██║
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║╚██████╔╝██║ ╚████║
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
--------------------------------------------------------------------------*/

import MobileLayout from './common/MobileLayout';

function GET_VALID_STORED_STATE() {
    var stored_APP_STATE = sessionStorage.getItem("APP_STATE");
    if (stored_APP_STATE) {
        var APP_STATE = JSON.parse(stored_APP_STATE);
        if (APP_STATE.app_view) {
            return APP_STATE;
        }
        APP_STATE.app_view = "INITIAL_SCREEN";
        return APP_STATE
    } else {
        return { app_view: "INITIAL_SCREEN" }
    }
}

function GET_REMOTE_STATE(session_key) {
    return {
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
}

function GET_UNION_STATE(stored_APP_STATE, initial_VIEW_CONFIG, remote_APP_STATE) {
    var union_STATE = {...stored_APP_STATE,
        ...initial_VIEW_CONFIG, ...remote_APP_STATE};
    return union_STATE;
}

function SET_STORED_STATE(ephemeral_APP_STATE) {
    var serialized_APP_STATE = JSON.stringify(ephemeral_APP_STATE);
    sessionStorage.setItem("APP_STATE", serialized_APP_STATE);
}

/*--------------------------------------------------------------------------
| Main App
--------------------------------------------------------------------------*/

class App extends React.Component {

    constructor(props) {
        super(props);

        this.setAppView = this.setAppView.bind(this);
        this.handle_back_button = this.handle_back_button.bind(this);
        this._view_config = this._view_config.bind(this);
        this.tempViewToggle = this.tempViewToggle.bind(this);

        /* INITIALIZE PERSISTANT STATE */
        var stored_APP_STATE = GET_VALID_STORED_STATE();
        var stored_APP_STATE_app_view = stored_APP_STATE.app_view;
        var initial_VIEW_CONFIG = this.GET_INITIAL_VIEW_CONFIG(
            stored_APP_STATE_app_view);
        var remote_APP_STATE = GET_REMOTE_STATE("fake_session_key");
        var union_APP_STATE = GET_UNION_STATE(stored_APP_STATE,
            initial_VIEW_CONFIG, remote_APP_STATE);
        this.state = union_APP_STATE;
        SET_STORED_STATE(union_APP_STATE);
    }

    GET_INITIAL_VIEW_CONFIG(app_view) {
        var initial_VIEW_CONFIG = this._view_config(app_view);
        return initial_VIEW_CONFIG;
    }

    setAppView(app_view) {
        var view_state_config = this._view_config(app_view);
        var union_state = {...this.state, ...view_state_config};
        this.setState(union_state);
        SET_STORED_STATE(union_state);
    }

    handle_back_button(back_view) {
        this.setAppView(back_view);
    }

    _view_config(app_view) {
        var config = {
            app_view: app_view,
            header_background: "white",
            content_background: "white",
            sidebar_background: "white",
            handle_back_button: false,
            sidebar_open: null,
        }
        switch (app_view) {
            /*--------------------------------------------------------------
             ██████╗ ██╗██████╗ ███████╗██████╗ ███████╗
             ██╔══██╗██║██╔══██╗██╔════╝██╔══██╗██╔════╝
             ██████╔╝██║██║  ██║█████╗  ██████╔╝███████╗
             ██╔══██╗██║██║  ██║██╔══╝  ██╔══██╗╚════██║
             ██║  ██║██║██████╔╝███████╗██║  ██║███████║
             ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
            --------------------------------------------------------------*/
            case "INITIAL_SCREEN":
                config.main_content = "initial screen content";
                config.sidebar_content = RiderSidebar;
                return config;
            case "FOO":
                config.main_content = Foo;
                config.sidebar_content = RiderSidebar;
                return config;
            case "BAR":
                config.main_content = Bar;
                config.sidebar_content = RiderSidebar;
                return config;
            case "BAZ":
                config.main_content = Baz;
                config.sidebar_content = RiderSidebar;
                return config;
            case "FOO_1":
                config.main_content = "foo 1 content";
                // Close the sidebar.
                // Go back to step "FOO".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO");
                return config;
            case "FOO_2":
                config.main_content = "foo 2 content";
                // Close the sidebar.
                // Go back to step "FOO_1".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO_1");
                return config;
            /*--------------------------------------------------------------
             ██████╗ ██████╗ ██╗██╗   ██╗███████╗██████╗ ███████╗
             ██╔══██╗██╔══██╗██║██║   ██║██╔════╝██╔══██╗██╔════╝
             ██║  ██║██████╔╝██║██║   ██║█████╗  ██████╔╝███████╗
             ██║  ██║██╔══██╗██║╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║
             ██████╔╝██║  ██║██║ ╚████╔╝ ███████╗██║  ██║███████║
             ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝
            --------------------------------------------------------------*/
            default:
                config.main_content = "default content";
                config.sidebar_content = "default sidebar";
                config.handle_back_button = () =>
                    this.handle_back_button("INITIAL_SCREEN");
                return config;
        }
    }

    render() {
        return (
<div>
    { this.tempViewToggle(true) }
    <MobileLayout {...this.state }>
    </MobileLayout>
</div>
        );
    }

    /*----------------------------------------------------------------------
    TOGGLE APP VIEW:
    This is a temporary function used to toggle the main `app_view`. It's
    either an onChange Handler or template depending on how it's used.
    ----------------------------------------------------------------------*/
    tempViewToggle(event) {
        if (event == true) {
            return (
            <select value={this.state.app_view}
                onChange={this.tempViewToggle}>{[
                    "INITIAL_SCREEN",
                    "FOO",
                    "FOO_1",
                    "FOO_2",
                    "BAR",
                    "BAZ",
                ].map(item => (<option value={item}>{item}</option>))}
            </select>);
        } else {
            this.setAppView(event.target.value);
        }
    }
}

ReactDOM.render(
     <App name="Homobiles" />,
     document.getElementById('App')
);
