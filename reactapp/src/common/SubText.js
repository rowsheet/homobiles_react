export default class SubText extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h5 style={ style }>
                { this.props.value }
            </h5>
        );
    }

}

var style = {
    background: "blue",
    height: "100px",
    width: "100%"
}
