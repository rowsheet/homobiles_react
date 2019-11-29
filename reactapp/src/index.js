import './static/style.css';

import React from "react";

import LayoutWithSidebar from './common/LayoutWithSidebar';
// DEMO
import DemoMapForm from './views/DemoMapForm';
import DemoItemList from './views/DemoItemList';
// RIDER
import RiderVerificationScreen from './views/RiderVerificationScreen';
import RiderSidebar from './views/RiderSidebar';
import RiderFoo from './views/RiderFoo';
import RiderBar from './views/RiderBar';
import RiderBaz from './views/RiderBaz';


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

import demoRemoteState from './demoRemoteState';

function GET_REMOTE_STATE(session_key) {
    return demoRemoteState;
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
            /***************************************************************
             * DEMO 
             **************************************************************/
            case "DEMO_MAP_FORM":
                config.main_content = DemoMapForm;
                config.sidebar_content = RiderSidebar;
                return config;
            case "DEMO_ITEM_LIST":
                config.main_content = DemoItemList;
                config.sidebar_content = RiderSidebar;
                return config;
            /***************************************************************
             * RIDER 
             **************************************************************/
            case "INITIAL_SCREEN":
                config.main_content = () => (<h1>initial screen content</h1>);
                config.sidebar_content = RiderSidebar;
                return config;
            case "RIDER_VERIFICATION_SCREEN":
                config.main_content = RiderVerificationScreen;
                config.sidebar_content = RiderSidebar;
                return config;
            case "RIDER_FOO":
                config.main_content = RiderFoo;
                config.sidebar_content = RiderSidebar;
                return config;
            case "RIDER_BAR":
                config.main_content = RiderBar;
                config.sidebar_content = RiderSidebar;
                return config;
            case "RIDER_BAZ":
                config.main_content = RiderBaz;
                config.sidebar_content = RiderSidebar;
                return config;
            case "RIDER_FOO_1":
                config.main_content = () => (<h1>rider foo 1 content</h1>);
                // Close the sidebar.
                // Go back to step "RIDER_FOO".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("RIDER_FOO");
                return config;
            case "RIDER_FOO_2":
                config.main_content = () => (<h1>rider foo 2 content</h1>);
                // Close the sidebar.
                // Go back to step "RIDER_FOO_1".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("RIDER_FOO_1");
                return config;
            /***************************************************************
             * DRIVER 
             **************************************************************/
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
    <LayoutWithSidebar {...this.state }>
    </LayoutWithSidebar>
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
                onChange={this.tempViewToggle}
                style={{ position: "absolute", zIndex: "1", right: "0px" }}>{[
                    // DEMO
                    "DEMO_MAP_FORM",
                    "DEMO_ITEM_LIST",
                    // RIDER
                    "RIDER_VERIFICATION_SCREEN",
                    "INITIAL_SCREEN",
                    "RIDER_FOO",
                    "RIDER_FOO_1",
                    "RIDER_FOO_2",
                    "RIDER_BAR",
                    "RIDER_BAZ",
                    // DRIVER
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
