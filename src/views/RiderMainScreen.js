// Layout
import ContentSplit from '../common/ContentSplit';
// Map
import Map from '../common/Map';
// Form
import TitlePadding from '../common/TitlePadding';
import PageTitle from '../common/PageTitle';
import TextInput from '../common/forms/TextInput';

import RowSheet from '../rowsheet';
import SETTINGS from '../settings';

export default class RiderMainScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var map = this.map();
        var form = this.form();
        return (
<div id="DemoMapForm">
    <ContentSplit
            top={ this.map }
            bottom={ this.form }>
    </ContentSplit>
</div>
        );
    }

    form() {
        var page_title = "Where can we take you?";
        return RowSheet.createElement("div", { style: style },
            RowSheet.createElement(TitlePadding,
                { height: "30px" }),
            RowSheet.createElement(PageTitle,
                { value: page_title, centered: false, bold: true }),
            RowSheet.createElement(TextInput, 
                { iconLeft: "fa-search" }),
            RowSheet.createElement(TextInput, 
                { iconLeft: "fa-calendar" }),
            RowSheet.createElement(TitlePadding,
                { height: "20px" }),
        );
    }

    map() {
        return (
<Map></Map>
        )
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}
