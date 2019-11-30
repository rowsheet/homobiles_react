import SETTINGS from '../../settings';

export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
    }

    inputLeft() {
        if (this.props.iconLeft) {
            var inputIconLeftStyle = _inputIconLeftStyle(this.props);
            return (
                <div className="inputIcon" style={ inputIconLeftStyle }>
                    <i className={ "fas " + this.props.iconLeft }></i>
                </div>
            );
        }
    }

    inputRight() {
        if (this.props.iconRight) {
            var inputIconRightStyle = _inputIconRightStyle(this.props);
            return (
                <div className="inputIcon" style={ inputIconRightStyle }>
                    <i className={ "fas " + this.props.iconRight }></i>
                </div>
            );
        }
    }

    render_ICON_BOTH() {
        var inputLeft = this.inputLeft();
        var inputRight = this.inputRight();
        var inputStyle = _inputStyle(this.props);
        var inputBorderWrapStyle = _inputBorderWrapStyle(this.props);
        return (
            <div>
                <div className="inputBorderWrap" style={ inputBorderWrapStyle }>
                    { inputLeft }
                    <input type={ "text" } style={ inputStyle }></input>
                    { inputRight }
                </div>
            </div>
        );
    }

    render() {
        return this.render_ICON_BOTH();
    }

}

function _inputBorderWrapStyle(props) {
    var style = {
        background: SETTINGS.THEME.input_background,
        padding: "3px",
        borderRadius: "100px",
        marginBottom: SETTINGS.SPACING.row_item_spacing,
        display: "flex",
    }
    if (props.verticalForm && !props.verticalLast) {
        style.marginBottom = "0px";
        style.paddingBottom = "0px";
    }
    if (props.verticalForm) {
        style.borderRadius = "0px";
    }
    if (props.verticalForm) {
        style.marginBottom = "0px";
    }
    return style;
}

function _inputStyle(props) {
    var style = {
        width: "100%",
        width: "100%",
        background: "white",
        fontSize: SETTINGS.THEME.input_font_size,
        padding: SETTINGS.THEME.input_padding,
        outline: "none",
        border: "none",
        margin: "0px",
    }

    if (props.iconLeft && props.iconRight) {
        style.borderRadius = "0px";
        if (props.iconRightBorder) {
            style.marginRight = "3px";
        }
    } else if (props.iconLeft) {

        style.borderRadius = "0px 100px 100px 0px";
        style.paddingRight = SETTINGS.utils.pixelsPlus(
            SETTINGS.THEME.input_padding, 9);

        // LEFT borderRadius verticalForm.
        if (props.verticalForm && props.verticalLast) {
            style.borderRadius = "0px 0px " +
                SETTINGS.THEME.input_border_radius + " 0px";
        } else if (props.verticalForm && props.verticalFirst) {
            style.borderRadius = "0px " +
                SETTINGS.THEME.input_border_radius + " 0px 0px";
        } else if (props.verticalForm) {
            style.borderRadius = "0px 0px 0px 0px";
        }

    } else if (props.iconRight) {

        style.paddingLeft = SETTINGS.utils.pixelsPlus(
            SETTINGS.THEME.input_padding, 9);
        style.borderRadius = "100px 0px 0px 100px";

        if (props.iconRightBorder) {
            style.marginRight = "3px";
        }

        // RIGHT borderRadius verticalForm.
        if (props.verticalForm && props.verticalLast) {
            style.borderRadius = "0px 0px 0px " +
                SETTINGS.THEME.input_border_radius; 
        } else if (props.verticalForm && props.verticalFirst) {
            style.borderRadius = SETTINGS.THEME.input_border_radius +
                " 0px 0px 0px";
        } else if (props.verticalForm) {
            style.borderRadius = "0px 0px 0px 0px";
        }

    } else {
        style.borderRadius = "100px 100px 100px 100px";
        style.paddingLeft = SETTINGS.utils.pixelsPlus(
            SETTINGS.THEME.input_padding, 9);
        style.paddingRight = SETTINGS.utils.pixelsPlus(
            SETTINGS.THEME.input_padding, 9);


        // BOTH borderRadius verticalForm.
        if (props.verticalForm && props.verticalLast) {
            style.borderRadius = 
                "0px 0px " +
                SETTINGS.THEME.input_border_radius + " " +
                SETTINGS.THEME.input_border_radius;
        } else if (props.verticalForm && props.verticalFirst) {
            style.borderRadius =
                SETTINGS.THEME.input_border_radius + " " +
                SETTINGS.THEME.input_border_radius + " " +
                " 0px 0px";
        } else if (props.verticalForm) {
            style.borderRadius = "0px 0px 0px 0px";
        }

    }

    return style;
}

function _inputIconLeftStyle(props) {
    var style = {
        background: "white",
        fontSize: SETTINGS.THEME.input_font_size,
        padding: SETTINGS.utils.pixelsPlus(SETTINGS.THEME.input_padding, 3),
        borderRadius: "100px 0px 0px 100px",
        minWidth: "30px",
        textAlign: "center",
    }

    if (props.verticalForm && props.verticalLast) {
        style.borderRadius = "0px 0px 0px " +
            SETTINGS.THEME.input_border_radius; 
    } else if (props.verticalForm && props.verticalFirst) {
        style.borderRadius = SETTINGS.THEME.input_border_radius +
            " 0px 0px 0px";
    } else if (props.verticalForm) {
        style.borderRadius = "0px 0px 0px 0px";
    }

    if (props.iconLeftBorder) {
        style.marginRight = "3px";
    }
    return style;
}

function _inputIconRightStyle(props) {
    var style = {
        background: "white",
        fontSize: SETTINGS.THEME.input_font_size,
        padding: SETTINGS.utils.pixelsPlus(SETTINGS.THEME.input_padding, 3),
        borderRadius: "0px 100px 100px 0px",
        minWidth: "30px",
        textAlign: "center",
    }

    if (props.verticalForm && props.verticalLast) {
        style.borderRadius = "0px 0px " +
            SETTINGS.THEME.input_border_radius + " 0px";
    } else if (props.verticalForm && props.verticalFirst) {
        style.borderRadius = "0px " +
            SETTINGS.THEME.input_border_radius + " 0px 0px";
    } else if (props.verticalForm) {
        style.borderRadius = "0px 0px 0px 0px";
    }

    return style;
}
