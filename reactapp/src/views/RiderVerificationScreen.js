import TitlePadding from '../common/TitlePadding';
import PageTitle from '../common/PageTitle';
import SubText from '../common/SubText';
import PhoneForm from '../common/forms/PhoneForm';

import RowSheet from '../rowsheet';
import SETTINGS from '../settings';
import Debug from '../debug';

function Foo(props) {
    return (
        <h1>
            Foo: { props.name }
        </h1>
    );
}

class RiderVerificationScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var page_title = "What’s your number?";
        var sub_text = "We’ll text you a code to verify your phone";
        return RowSheet.createElement("div", { style: style },
            RowSheet.createElement(TitlePadding),
            RowSheet.createElement(PageTitle,
                { value: page_title, centered: false, bold: true }),
            RowSheet.createElement(SubText,
                { value: sub_text, centered: false }),
            // DEFAULT 
            RowSheet.createElement(PhoneForm),
            // ICON_LEFT
            RowSheet.createElement(PhoneForm, 
                { iconLeft: "fa-phone" }),
            // ICON_LEFT_BORDER
            RowSheet.createElement(PhoneForm, 
                { iconLeft: "fa-phone", iconLeftBorder: true }),
            // ICON_RIGHT
            RowSheet.createElement(PhoneForm, 
                { iconRight: "fa-phone" }),
            // ICON_RIGHT_BORDER
            RowSheet.createElement(PhoneForm, 
                { iconRight: "fa-user", iconRightBorder: true }),
            // ALL
            RowSheet.createElement(PhoneForm, 
                { iconRight: "fa-phone", iconRightBorder: true,
                iconLeft: "fa-cog", iconLeftBorder: true }),
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}

export default RiderVerificationScreen;
