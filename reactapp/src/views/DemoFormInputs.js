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
            // Temp
            RowSheet.createElement("div", {}, this.props.state_test),
            // DEFAULT 
            RowSheet.createElement(TextInput,
                { onChange: (event) =>
                    this.props.handle_test(event.target.value),
                }),
            // ICON_LEFT
            RowSheet.createElement(TextInput, 
                { iconLeft: "fa-phone" }),
            // ICON_LEFT_TEXT
            RowSheet.createElement(TextInput, 
                { iconLeft: "Left", iconLeftType: "text"}),
            // ICON_LEFT_BORDER
            RowSheet.createElement(TextInput, 
                { iconLeft: "fa-phone", iconLeftBorder: true }),
            // ICON_RIGHT
            RowSheet.createElement(TextInput, 
                { iconRight: "fa-phone" }),
            // ICON_RIGHT_TEXT
            RowSheet.createElement(TextInput, 
                { iconRight: "Right" , iconRightType: "text"}),
            // PLACEHOLDER
            RowSheet.createElement(TextInput, 
                { placeholder: "Placeholder text demo..."}),
            // VALUE
            RowSheet.createElement(TextInput, 
                { value: "Value text demo..."}),
            // ICON_RIGHT_BORDER
            RowSheet.createElement(TextInput, 
                { iconRight: "fa-user", iconRightBorder: true }),
            // ALL
            RowSheet.createElement(TextInput, 
                { iconRight: "fa-phone", iconRightBorder: true,
                iconLeft: "fa-cog", iconLeftBorder: true,
                placeholder: "Placeholder text demo..."}),
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}
