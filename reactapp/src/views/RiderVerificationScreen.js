import TitlePadding from '../common/TitlePadding';
import PageTitle from '../common/PageTitle';
import SubText from '../common/SubText';
import TextInput from '../common/forms/TextInput';

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
            // ICON_LEFT
            RowSheet.createElement(TextInput, 
                { iconLeft: "fa-phone" }),
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}

export default RiderVerificationScreen;
