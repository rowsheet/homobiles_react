import RowSheet from '../rowsheet';

export default class ContentSplitSplitTop extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
<div style={ wrapperStyle }>
    <div style={ contentStyle }>
        <div id="ContentSplitSplitTop_Top">
            { RowSheet.createElement(this.props.top) }
        </div>
        <div id="ContentSplitSplitTop_Bottom" style={ bottomStyle }>
            { RowSheet.createElement(this.props.bottom) }
        </div>
    </div>
</div>
        );
    }
}
var wrapperStyle = {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    flexDirection: "column",
    width: "100%",
}
var contentStyle = {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    minHeight: "0",
}
var bottomStyle = {
    background: "white",
    flexGrow: "1",
    overflow: "auto",
    minHeight: "0",
}
