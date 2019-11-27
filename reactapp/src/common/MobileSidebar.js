export class MobileSidebar extends React.Component {

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

export default MobileSidebar;