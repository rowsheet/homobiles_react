import SETTINGS from '../settings';

export default class SubText extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h4 style={{ ...style, ...{
                fontWeight: (this.props.bold ? "bold" : "unset"),
                textAlign: (this.props.centered ? "center": "unset"),
            }}}>
                { this.props.value }
            </h4>
        );
    }

}

var style = {
    width: "100%",
    margin: "0px",
    color: SETTINGS.COLORS.sub_text,
    paddingBottom: SETTINGS.SPACING.row_item_spacing,
}
