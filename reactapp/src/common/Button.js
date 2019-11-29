import SETTINGS from '../settings';

export class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    text() {
        if (this.props.text) {
            return this.props.text;
        }
        return "";
    }

    icon() {
        var icon = this.props.icon || "fa-question";
        return (
            <i className={ "fas " + icon }></i>
        )
    }

    render() {
        var text = this.text();
        var icon = this.icon();
        return (
            <a style={ buttonStyle }>
                { icon } { text }
            </a>
        );
    }

}

var buttonStyle = {
    background: SETTINGS.COLORS.pink,
    color: "white",
    fontSize: "13px",
    height: "30px",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "1000px",
    padding: "5px 10px",
}

export default Button;
