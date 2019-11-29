export default class PageTitle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2 style={ style }>
                { this.props.value }
            </h2>
        );
    }
}

var style = {
    background: "red",
    height: "100px",
    width: "100%"
}
