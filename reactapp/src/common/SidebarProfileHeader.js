import SETTINGS from "../settings.js";

export class SidebarProfileHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
<div id="SidebarProfileHeader" style={{
    ...SETTINGS.SidebarProfileHeader.style, ...{
    padding: "15px",
    textAlign: "center",
}}}>
    <div id="SidebarProfileHeader_photo" style={{
        width: "125px",
        height: "125px",
        background: "#D8D8D8",
        margin: "auto",
        borderRadius: "100px",
    }}>
        <p className="title_text white" style={{
            paddingTop: "41px",
            width: "50px",
            margin: "auto",
        }}>{ SETTINGS.SidebarProfileHeader.default_image_text }</p>
    </div>
    <h4 className="title_text white" style={{
        margin: "0px",
        marginTop: "15px",
    }}>
            { this.props.username }</h4>
    <p className="white">
            { this.props.pronouns }</p>
</div>
        );
    }
}

export default SidebarProfileHeader;
