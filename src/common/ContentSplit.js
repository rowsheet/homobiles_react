import RowSheet from '../rowsheet';

export class ContentSplit extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("ContentSplit");
        console.log(this.props);
        return (
<div id="ContentSplit" style={{
    display: "flex",
    height: "100vh",
    flexFlow: "column",
}}>
    <div id="ContentSplit_top" style={{
        background: "lightgreen",
        flex: "1",
        overflow: "hidden",
    }}>
        { RowSheet.createElement(this.props.top) }
    </div>
    <div id="ContentSplit_bottom">
        { RowSheet.createElement(this.props.bottom) }
    </div>
</div>
        );
    }
}

export default ContentSplit;
