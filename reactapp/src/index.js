import './static/style.css';

import React from "react";

import Api from "./api";

import LayoutWithSidebar from './common/LayoutWithSidebar';
// DEMO
import DemoMapForm from './views/DemoMapForm';
import DemoItemList from './views/DemoItemList';
import DemoFormInputs from './views/DemoFormInputs';
import DemoFormGroups from './views/DemoFormGroups';
// RIDER
import RiderVerificationScreen from './views/RiderVerificationScreen';
import RiderVerificationScreenConfirm from './views/RiderVerificationScreenConfirm';
import RiderMainScreen from './views/RiderMainScreen';
import RiderSetLocation from './views/RiderSetLocation';
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

        /*----------------------------------------------------------------------
        METHOD BINDERS
        ----------------------------------------------------------------------*/
        this.setAppView = this.setAppView.bind(this);
        this.handle_back_button = this.handle_back_button.bind(this);
        this._view_config = this._view_config.bind(this);
        this.tempViewToggle = this.tempViewToggle.bind(this);
        this.updateState = this.updateState.bind(this);
        this.render_CHECK_INTERNET_CONNECTION =
            this.render_CHECK_INTERNET_CONNECTION.bind(this);

        // API Handlers:

        // Temp For: ASYNC_API_TEST
        this.handle_test = this.handle_test.bind(this);

        /*----------------------------------------------------------------------
        INITIALIZE PERSISTANT STATE
        ----------------------------------------------------------------------*/
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

    updateState(state) {
        // Do normal setState, but also save to persistent storage, in this
        // case we are using sessionStorage.
        this.setState(state);
    }

    // Temp For: ASYNC_API_TEST
    handle_test(value) {

        // Indicate loading.

        this.updateState({ state_test: "LOADING..." });

        // Load from the API (API returns promise).

        Api.test(value).then(

            // RESOLVED

            ((response) => {
                response.json().then((json) => {
                    this.updateState({
                        state_test: `RESOLVED:[${response.status}] ` +
                            JSON.stringify(json),
                    });
                });
            }).bind(this),

            // REJECTED (API SERVER DOWN)

            ((error) => {
                this.updateState({
                    INERNET_DOWN: true,
                });
            }).bind(this)
        );
    }

    _view_config(app_view) {
        var config = {
            app_view: app_view,
            header_background: "white",
            content_background: "white",
            sidebar_background: "white",
            handle_back_button: false,
            sidebar_open: null,

            /*------------------------------------------------------------------
            API States
            ------------------------------------------------------------------*/
            // Temp For: ASYNC_API_TEST
            state_test: "ORIGINAL",

            /*------------------------------------------------------------------
            API Handlers
            ------------------------------------------------------------------*/

            // Temp For: ASYNC_API_TEST
            handle_test: this.handle_test
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
            case "DEMO_FORM_INPUTS":
                config.main_content = DemoFormInputs;
                config.sidebar_content = RiderSidebar;
                return config;
            case "DEMO_FORM_GROUPS":
                config.main_content = DemoFormGroups;
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
            case "RIDER_VERIFICATION_SCREEN_CONFIRM":
                config.main_content = RiderVerificationScreenConfirm;
                config.sidebar_content = RiderSidebar;
                return config;
            case "RIDER_MAIN_SCREEN":
                config.main_content = RiderMainScreen;
                config.sidebar_content = RiderSidebar;
                return config;
            case "RIDER_SET_LOCATION":
                config.main_content = RiderSetLocation;
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

    render_CHECK_INTERNET_CONNECTION() {
        if (!this.state.INERNET_DOWN) {
            return "";
        }
        var overlayStyle = {
            background: "#00000075",
            position: "absolute",
            zIndex: "9000000",
            height: "100%",
            width: "100%",
        };
        var modalStyle = {
            background: "white",
            margin: "10vw",
            padding: "5vw",
            marginTop: "33%",
            borderRadius: "10px",
        };
        var dangerIconStyle = {
            color: "#F44336",
        };
        return (
            <div style={ overlayStyle }>
                <div style={ modalStyle }>
                    <i className="fas fa-exclamation-triangle"
                        style={ dangerIconStyle }></i>
                    <div style={{ display: "inline-block" }}>
                        You're not connected to the internet.
                    </div>
                </div>
            </div>
        )
    }

    render() {
        var CHECK_INTERNET_CONNECTION = this.render_CHECK_INTERNET_CONNECTION();
        return (
<div>
    { CHECK_INTERNET_CONNECTION }
    { this.tempViewToggle(true) }
    { this.devTools() }
    <LayoutWithSidebar {...this.state }>
    </LayoutWithSidebar>
</div>
        );
    }

    devTools() {
        return (
            <button style={{position: "absolute",right: "0px",
                top: "19px",zIndex: "1000000"}}
                onClick={ window.RSDB }>
            Debug 
            </button>
        )
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
                    "DEMO_FORM_INPUTS",
                    "DEMO_FORM_GROUPS",
                    // RIDER
                    "RIDER_VERIFICATION_SCREEN",
                    "RIDER_VERIFICATION_SCREEN_CONFIRM",
                    "RIDER_MAIN_SCREEN",
                    "RIDER_SET_LOCATION",
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
