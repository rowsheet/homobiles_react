import MobileSidebar from './MobileSidebar';
import RowSheet from '../rowsheet';

export class MobileLayout extends React.Component {
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

    {/* ----------- SIDEBAR -------------------------------------------- */}

    <MobileSidebar {...this.props }
            sidebar_open={ sidebar_open }
            close_sidebar={ this.close_sidebar }
            sidebar_background={ this.props.sidebar_background }
            sidebar_content={ this.props.sidebar_content }
            >
    </MobileSidebar>

    {/* ----------- MAIN CONTENT --------------------------------------- */}

    <div className="rs_main">
        <i className="fas fa-chevron-left" style={{
            padding: "15px",
            position: "absolute",
            fontSize: "25px",
            zIndex: "1",
        }}
            onClick={ this.handle_layout_back_button }></i>

        <div className="rs_main_content" style={{
            background: "white",
            height: "100vh",
        }}>
            { RowSheet.createElement(this.props.main_content) }
        </div>
    </div>
</div>
        );
    }
}

export default MobileLayout;
