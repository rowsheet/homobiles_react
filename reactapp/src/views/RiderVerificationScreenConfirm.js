import TitlePadding from '../common/TitlePadding';
import PageTitle from '../common/PageTitle';
import SubText from '../common/SubText';
import TextInput from '../common/forms/TextInput';

import RowSheet from '../rowsheet';
import SETTINGS from '../settings';
import Debug from '../debug';

export default class RiderVerificationScreenConfirm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var page_title = "Enter your code";
        var sub_text = "Enter the verification code we sent you.";
        return RowSheet.createElement("div", { style: style },
            RowSheet.createElement(TitlePadding),
            RowSheet.createElement(PageTitle,
                { value: page_title, centered: false, bold: true }),
            RowSheet.createElement(SubText,
                { value: sub_text, centered: false }),
            // ICON_LEFT
            RowSheet.createElement(TextInput),
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}
