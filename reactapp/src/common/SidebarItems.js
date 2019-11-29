import SETTINGS from "../settings.js";

export class SidebarItems extends React.Component {

    constructor(props) {
        super(props);
    }

    footer() {
        try {
            var icon = this.props.footer.icon;
            var title = this.props.footer.title;
            var footer = (
<p style={{
    padding: "7px",
    paddingLeft: "31px",
    fontSize: "16px",
    paddingBottom: "8px",
    position: "absolute",
    bottom: "25px",
}}>
    <i className={ "fa " + icon } style={{
    width: "50px",
    fontSize: "25px",
    verticalAlign: "middle",
}}></i>
    { title }
</p>
            );
            return footer;
        } catch(error) {
            return "";
        }
    }

    render () {
        var footer = this.footer();
        return (
<div id="SidebarItems" style={{
    margin: "auto",
    padding: "25px",
}}>
    { this.props.items.map(item => (
        <div className={ item.active ? "pink title_text" : "" }>
            <i className={ "fa " + item.icon } style={{
                width: "50px",
                fontSize: "25px",
                verticalAlign: "middle",
                paddingTop: "10px",
            }}></i>
            { item.title }
        </div>
    )) }
    { footer }
</div>
        );
    }
}

export default SidebarItems;
