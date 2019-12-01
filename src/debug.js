export default class Debug extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="debug">
                { this.props.name }
            </div>
        )
    }
}
