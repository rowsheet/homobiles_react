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
<div id="SidebarItems">
    <ul style={{
        listStyleType: "none",
        padding: "0px",
        paddingTop: "18px",
    }}>
        { this.props.items.map(item => (
            <li className={ item.active ? "pink title_text" : "" } style={{
                padding: "7px",
                paddingLeft: "31px",
                fontSize: "16px",
                paddingBottom: "8px",
            }}>
                <i className={ "fa " + item.icon } style={{
                    width: "50px",
                    fontSize: "25px",
                    verticalAlign: "middle",
                }}></i>
                { item.title }
            </li>
        )) }
    </ul>
    { footer }
</div>
        );
    }
}

export default SidebarItems;
