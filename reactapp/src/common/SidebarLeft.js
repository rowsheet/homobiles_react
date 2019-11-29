import RowSheet from '../rowsheet';

export class SidebarLeft extends React.Component {

    constructor(props) {
        super(props);
    }

    style() {
        var style = {
            background: this.props.sidebar_background,
            position: "absolute",
            width: "75%",
            height: "100%",
            maxWidth: "300px",
        }
        if (this.props.sidebar_open == true) {
            style.mgainLeft = "-300px";
        }
        return style;
    }

    overlay_style() {
        var style = {
            width: "100%",
            height: "100%",
            background: "#0000004d",
            position: "absolute",
            zIndex: "1000",
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
        { RowSheet.createElement(this.props.sidebar_content, this.props) }
    </div>
</div>
        );
    }
}

export default SidebarLeft;
