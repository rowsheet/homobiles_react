export class CoverContentLayout extends React.Component {
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
    }}>
        <h3>Top</h3>
        <h3>Top</h3>
        <h3>Top</h3>
        <h3>Top</h3>
        <h3>Top</h3>
    </div>
    <div id="CoverContentLayout_bottom" style={{
        background: "lightblue",
    }}>
        <h3>Something</h3>
        <h3>Something</h3>
        <h3>Something</h3>
    </div>
</div>
        );
    }
}

export default CoverContentLayout;
