import TitlePadding from '../common/TitlePadding';
import PageTitle from '../common/PageTitle';
import TextInput from '../common/forms/TextInput';
import VerticalFormGroup from '../common/forms/VerticalFormGroup';

import RowSheet from '../rowsheet';
import SETTINGS from '../settings';
import Debug from '../debug';

export default class RiderSetLocation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var page_title = "SL: Where can we take you?";
        return RowSheet.createElement("div", { style: style },
            RowSheet.createElement(TitlePadding),
            RowSheet.createElement(PageTitle,
                { value: page_title, centered: false, bold: true }),
            RowSheet.createElement(VerticalFormGroup, {
                items: [
                    {
                        iconLeft: "fa-phone",
                        verticalForm: true,
                        verticalFirst: true,
                    },
                    {
                        iconRight: "fa-plus",
                        iconLeft: "fa-cog",
                        verticalForm: true,
                        verticalLast: true,
                    },
                ]}),
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}
