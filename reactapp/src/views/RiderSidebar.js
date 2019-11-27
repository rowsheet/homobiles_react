import SidebarProfileHeader from "../common/SidebarProfileHeader";
import SidebarItems from "../common/SidebarItems";
import SETTINGS from "../settings.js";

export class RiderSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    username_pronoun() {
        try {
            var username = this.props.RiderSidebar.username;
            var pronouns = this.props.RiderSidebar.pronouns;
            return [username, pronouns];
        } catch(error) {
            var username = SETTINGS.RiderSidebar.default_username;
            var pronouns = SETTINGS.RiderSidebar.default_pronouns;
            return [username, pronouns];
        }
    }

    sidebar_items() {
        try {
            var sidebar_items = this.props.RiderSidebar.items.map(item => ({
                key: item.key,
                title: item.title,
                icon: item.icon,
                active: item.active,
            }));
            return sidebar_items;
        } catch(error) {
            var sidebar_items = []
            return sidebar_items;
        }
    }

    sidebar_footer() {
        try {
            var footer = this.props.RiderSidebar.footer;
            return {
                key: footer.key,
                title: footer.title,
                icon: footer.icon,
            }
        } catch(error) {
            return null;
        }
    }

    render () {
        var username_pronoun = this.username_pronoun();
        var username = username_pronoun[0]
        var pronouns = username_pronoun[1]
        var sidebar_items = this.sidebar_items();
        var sidebar_footer = this.sidebar_footer();
        return (
<div id="RiderSidebar">
    <SidebarProfileHeader 
            username={ username }
            pronouns={ pronouns }
            ></SidebarProfileHeader>
    <SidebarItems items={ sidebar_items } footer={ sidebar_footer }
            ></SidebarItems>
</div>
        );
    }
}

export default RiderSidebar;
