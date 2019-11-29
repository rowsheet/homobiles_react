import RowSheet from '../rowsheet';

export class CoverContentLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
<div id="CoverContentLayout" style={{
    display: "flex",
    height: "100vh",
    flexFlow: "column",
}}>
    <div id="CoverContentLayout_top" style={{
        background: "lightgreen",
        flex: "1",
        overflow: "hidden",
    }}>
        { RowSheet.createElement(this.props.top) }
    </div>
    <div id="CoverContentLayout_bottom" style={{
        background: "lightblue",
    }}>
        { RowSheet.createElement(this.props.bottom) }
    </div>
</div>
        );
    }
}

export default CoverContentLayout;
