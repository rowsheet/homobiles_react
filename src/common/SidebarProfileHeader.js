import SETTINGS from "../settings.js";

export class SidebarProfileHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
<div id="SidebarProfileHeader" style={{
    ...SETTINGS.SidebarProfileHeader.style, ...{
    height: "fit-content",
    padding: "15px",
    textAlign: "center",
}}}>
    <div id="SidebarProfileHeader_photo" style={{
        background: "rgb(216, 216, 216)",
        margin: "auto",
        position: "relative",
        width: "50%",
        paddingBottom: "50%",
        borderRadius: "100%",
        height: "0",
    }}>
        <p className="title_text white" style={{
            width: "100%",
            margin: "auto",
            position: "absolute",
            top: "calc(50% - 10px)",
            height: "10px",
        }}>{ SETTINGS.SidebarProfileHeader.default_image_text }</p>
    </div>
    <h4 className="title_text white" style={{
        margin: "0px",
        marginTop: "5px",
    }}>
            { this.props.username }</h4>
    <p className="white" style={{
        margin: "0px",
        marginTop: "5px",
    }}>
            { this.props.pronouns }</p>
</div>
        );
    }
}

export default SidebarProfileHeader;
