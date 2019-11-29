import TextInput from '../common/forms/TextInput';
import PageTitle from '../common/PageTitle';
import TitlePadding from '../common/TitlePadding';
import SubText from '../common/SubText';

import RowSheet from '../rowsheet';
import SETTINGS from '../settings';

export default class DemoFormInputs extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        var page_title = "Demo Form Inputs";
        var sub_text = "Test all the demo form inputs";
        return RowSheet.createElement("div", { style: style },
            RowSheet.createElement(TitlePadding),
            RowSheet.createElement(PageTitle,
                { value: page_title, centered: false, bold: true }),
            RowSheet.createElement(SubText,
                { value: sub_text, centered: false }),
            // DEFAULT 
            RowSheet.createElement(TextInput),
            // ICON_LEFT
            RowSheet.createElement(TextInput, 
                { iconLeft: "fa-phone" }),
            // ICON_LEFT_BORDER
            RowSheet.createElement(TextInput, 
                { iconLeft: "fa-phone", iconLeftBorder: true }),
            // ICON_RIGHT
            RowSheet.createElement(TextInput, 
                { iconRight: "fa-phone" }),
            // ICON_RIGHT_BORDER
            RowSheet.createElement(TextInput, 
                { iconRight: "fa-user", iconRightBorder: true }),
            // ALL
            RowSheet.createElement(TextInput, 
                { iconRight: "fa-phone", iconRightBorder: true,
                iconLeft: "fa-cog", iconLeftBorder: true }),
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}
