import SETTINGS from '../settings';

export default class PageTitle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2 style={{ ...style, ...{
                fontWeight: (this.props.bold ? "bold" : "unset"),
                textAlign: (this.props.centered ? "center": "unset"),
            }}}>
                { this.props.value }
            </h2>
        );
    }
}

var style = {
    width: "100%",
    margin: "0px",
    paddingBottom: SETTINGS.SPACING.row_item_spacing,
}
