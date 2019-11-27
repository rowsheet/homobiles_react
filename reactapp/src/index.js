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

/*--------------------------------------------------------------------------
| Main App
--------------------------------------------------------------------------*/

class App extends React.Component {

    constructor(props) {
        super(props);

        /*------------------------------------------------------------------
         * Determinte the initial app_view on page-load. This will depend
         * on weather the user is logged in, in the middle of a ride,
         * configuring profile settings, etc. 
         * Note:
         *      This should be fetched from the cookie.
        ------------------------------------------------------------------*/
        /*
        var initial_app_view = this.determine_app_view() 
        this.state = {
            app_view: initial_app_view,
        }
        */
        this.load_session = this.load_session.bind(this);
        this.state = this.load_state();

        /*------------------------------------------------------------------
         * Bind class methods
        ------------------------------------------------------------------*/

        this.tempViewToggle = this.tempViewToggle.bind(this);
        this.setAppView = this.setAppView.bind(this);
        this.handle_back_button = this.handle_back_button.bind(this);
        this.view_config = this.view_config.bind(this);

        /*------------------------------------------------------------------
         * Set the initial state based on the app_view, but get detailed
         * configuration from the view_config which will tell you what
         * views to render, color settings, handlers, etc.
        ------------------------------------------------------------------*/

        this.state = this.view_config(this.state.app_view);
    }

    load_session(session_key) {
        return {
            RiderSidebar: {
                username: "John Smith",
                pronouns: "they/them/theirs",
            }
        }
    }
    
    /*----------------------------------------------------------------------
     * Tell me one good reason I should do this.
     *
     * 1) Load the previous state from sessionStorage.
     * 2) Load remove updates via AJAX.
    ----------------------------------------------------------------------*/
    load_state() {
        var previousState = sessionStorage.getItem("APP_STATE");
        if (previousState) {
            previousState = JSON.parse(previousState);
            var sessionState = this.load_session(previousState.session_key);
            // Loading sessionState after will overwrite anything in the
            // previousState, which is what is more "correct".
            return {...previousState, ...sessionState}
        } else {
            return { app_view: "INITIAL_SCREEN" };
        }
    }

    /*----------------------------------------------------------------------
     * Only on initialization.
     * Determine the proper state based on cookies for the on page-load.
     * @TODO Check API and session things.
    ----------------------------------------------------------------------*/
    /*
    determine_app_view() {
        var previous_app_view = GET_COOKIE("APP_VIEW");
        if (previous_app_view) {
            return previous_app_view;
        }
        return "INITIAL_SCREEN";
    }
    */

    /*----------------------------------------------------------------------
     * Set the app_view based on a detailed match case of the view_config.
    ----------------------------------------------------------------------*/
    setAppView(app_view) {
        var old_state = this.state;
        var new_state = this.view_config(app_view);
        var state = {...old_state, ...new_state};
        this.setState(state);
        sessionStorage.setItem("APP_STATE", JSON.stringify(new_state));
    }

    /*----------------------------------------------------------------------
     * Go back to another app view. This is the back-button so when
     * this is specified, the user expects it to go backwards to
     * a previous view instead of opening the sidebar (default).
    ----------------------------------------------------------------------*/
    handle_back_button(back_view) {
        this.setAppView(back_view);
    }

    /*----------------------------------------------------------------------
     * Configure all the app_views, handlers, loaders, etc.
     * This is the meat of the business logic.
     * @TODO see about exporting to an external data-structure.
    ----------------------------------------------------------------------*/
    view_config(app_view) {
        // Set the default config that's common accross most views.
        var config = {
            app_view: app_view,
            header_background: "white",
            content_background: "white",
            sidebar_background: "white",
            handle_back_button: false,
            /* Set the sidebar_open to null so that if the layout
             * state already has it open, it leavs it open. Only set
             * the config.sidebar_open = false if the sidebar should
             * close when that view is loaded (this will overwrite
             * the state open setting). */
            sidebar_open: null,
        }
        /* Set content and handler functions. Handler functions can be
         * specified to override layout functions such as the chevron 
         * back-button which normall opens the sidebar. */
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
                config.sidebar_content = "initial screen sidebar";
                return config;
            case "FOO":
                var foo = new Foo();
                config.main_content = foo.render();
                console.log("BEFORE");
                config.sidebar_content = (
                    <RiderSidebar{...this.state} foo="test"/>);
                console.log("AFTER");
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
            case "FOO_3":
                config.main_content = "foo 3 content";
                // Close the sidebar.
                // Go back to step "FOO_2".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO_2");
                return config;
            case "FOO_4":
                config.main_content = "foo 4 content";
                // Close the sidebar.
                // Go back to step "FOO_3".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO_3");
                return config;
            case "BAR":
                var bar = new Bar();
                config.main_content = bar.render();
                config.sidebar_content = "bar sidebar";
                return config;
            case "BAZ":
                var baz = new Baz();
                config.main_content = baz.render();
                config.sidebar_content = "baz sidebar";
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
                    this.handle_back_button("INITIAL_SCREEN"); // @TODO => HOME
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
                "FOO_3",
                "FOO_4",
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
