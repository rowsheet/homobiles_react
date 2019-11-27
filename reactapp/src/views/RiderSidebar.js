import SidebarProfileHeader from "../common/SidebarProfileHeader";
import SETTINGS from "../settings.js";

export class RiderSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        // console.log("this.props");
        // console.log(this.props);
        var username = this.props.RiderSidebar.username ||
            SETTINGS.RiderSidebar.default_username;
        var pronouns = this.props.RiderSidebar.pronouns ||
            SETTINGS.RiderSidebar.default_pronouns;
        return (
<div id="RiderSidebar">
    <SidebarProfileHeader 
            username={ username }
            pronouns={ pronouns }
            ></SidebarProfileHeader>
    <h1>Sup</h1>
</div>
        );
    }
}

export default RiderSidebar;
