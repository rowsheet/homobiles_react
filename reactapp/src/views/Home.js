class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
        }
    }

    style() {
        var style = {
            background: this.props.sidebar_background,
            position: "absolute",
            width: "300px",
            height: "100vh",
        }
        if (this.props.sidebar_open == true) {
            style.mgainLeft = "-300px";
        }
        return style;
    }

    overlay_style() {
        var style = {
            width: "100%",
            height: "100vh",
            background: "#0000004d",
            position: "absolute",
            display: "none",
        }
        if (this.props.sidebar_open == true) {
            style.display = "block";
        }
        return style;
    }

    render() {
        return (
<div className="rs_sidebar_overlay" style={this.overlay_style()}
            onClick={this.props.close_sidebar}>
    <div className="rs_sidebar" style={this.style()}>
        { this.props.sidebar_content }
    </div>
</div>
        );
    }
}

class MobileLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar_open: props.sidebar_open,
        }
        this.handle_layout_back_button = this.handle_layout_back_button.bind(this);
        this.open_sidebar = this.open_sidebar.bind(this);
        this.close_sidebar = this.close_sidebar.bind(this);
    }

    handle_layout_back_button() {
        if (this.props.handle_back_button) {
            this.props.handle_back_button();
        } else {
            this.open_sidebar();
        }
    }

    open_sidebar() {
        var state = this.state
        state.sidebar_open = true;
        this.setState(state);
    }

    close_sidebar() {
        var state = this.state
        state.sidebar_open = false;
        this.setState(state);
    }

    render() {

        /*------------------------------------------------------------------
         * Set the sidebar to the state, unless the property
         * specifies that it should close. This will allow for
         * easy navigation when the sidebar is open except when it
         * navigates to screens where there should be no sidebar
         * at all (only a "back" button).
        ------------------------------------------------------------------*/

        var sidebar_open = this.state.sidebar_open;
        if (this.props.sidebar_open == false) {
            sidebar_open = false;
        }
        return (
<div style={{ background: "red", height: "100vh" }}>
    <Sidebar {...this.state}
            sidebar_open={ sidebar_open }
            close_sidebar={ this.close_sidebar }
            sidebar_background={ this.props.sidebar_background }
            sidebar_content={ this.props.sidebar_content }
            >
    </Sidebar>
    <div className="rs_main" style={{
    }}>
        <div className="rs_main_header" style={{
            background: this.props.header_background,
            height: "50px",
        }}>
            <i className="fas fa-chevron-left" style={{ padding: "15px" }}
            onClick={ this.handle_layout_back_button }></i>
        </div>
        <div className="rs_main_content" style={{
            background: this.props.content_background,
            height: "calc(100vh - 50px)",
        }}>
            <p>{ this.props.main_content }</p>
        </div>
    </div>
</div>
        );
    }
}

export class Home extends React.Component {

    constructor(props) {
        super(props);

        /*------------------------------------------------------------------
         * Determinte the initial app_view on page-load. This will depend
         * on weather the user is logged in, in the middle of a ride,
         * configuring profile settings, etc. 
         * Note:
         *      This should be fetched from the cookie.
        ------------------------------------------------------------------*/

        var initial_app_view = this.determine_app_view() 
        this.state = {
            app_view: initial_app_view,
        }

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

    /*----------------------------------------------------------------------
     * Only on initialization.
     * Determine the proper state based on cookies for the on page-load.
     * @TODO Check API and session things.
    ----------------------------------------------------------------------*/
    determine_app_view() {
        return "INITIAL_SCREEN";
    }

    /*----------------------------------------------------------------------
     * Set the app_view based on a detailed match case of the view_config.
    ----------------------------------------------------------------------*/
    setAppView(app_view) {
        this.setState(this.view_config(app_view));
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
            case "INITIAL_SCREEN":
                config.main_content = "initial screen content";
                config.sidebar_content = "initial screen sidebar";
                return config;
            case "FOO":
                config.main_content = "foo content";
                config.sidebar_content = "foo sidebar";
                return config;
            case "FOO_1":
                config.main_content = "foo 1 content";
                config.sidebar_content = "foo 1 sidebar";
                // Close the sidebar.
                // Go back to step "FOO".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO");
                return config;
            case "FOO_2":
                config.main_content = "foo 2 content";
                config.sidebar_content = "foo 2 sidebar";
                // Close the sidebar.
                // Go back to step "FOO_1".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO_1");
                return config;
            case "FOO_3":
                config.main_content = "foo 3 content";
                config.sidebar_content = "foo 3 sidebar";
                // Close the sidebar.
                // Go back to step "FOO_2".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO_2");
                return config;
            case "FOO_4":
                config.main_content = "foo 4 content";
                config.sidebar_content = "foo 4 sidebar";
                // Close the sidebar.
                // Go back to step "FOO_3".
                config.sidebar_open = false;
                config.handle_back_button = () =>
                    this.handle_back_button("FOO_3");
                return config;
            case "BAR":
                config.main_content = "bar content";
                config.sidebar_content = "bar sidebar";
                return config;
            case "BAZ":
                config.main_content = "baz content";
                config.sidebar_content = "baz sidebar";
                return config;
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

export default Home;
