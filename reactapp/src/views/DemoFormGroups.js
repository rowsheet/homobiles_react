import PageTitle from '../common/PageTitle';
import TitlePadding from '../common/TitlePadding';
import VerticalFormGroup from '../common/forms/VerticalFormGroup';

import RowSheet from '../rowsheet';
import SETTINGS from '../settings';

export default class DemoFormGroups extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        var page_title = "Demo Form Groups";
        return RowSheet.createElement("div", { style: style },
            RowSheet.createElement(TitlePadding),
            RowSheet.createElement(PageTitle,
                { value: page_title, centered: false, bold: true }),
            // ICONS BOTH
            RowSheet.createElement(VerticalFormGroup, {
                items: [
                    {
                        iconRight: "fa-phone", iconRightBorder: true,
                        iconLeft: "fa-phone", iconLeftBorder: true,
                        verticalForm: true, verticalFirst: true,
                    },
                    {
                        iconRight: "fa-phone", iconRightBorder: true,
                        iconLeft: "fa-cog", iconLeftBorder: true,
                        verticalForm: true
                    },
                    {
                        iconRight: "fa-phone", iconRightBorder: true,
                        iconLeft: "fa-cog", iconLeftBorder: true,
                        verticalForm: true, verticalLast: true,
                    },
                ]}),
            // ICONS LEFT 
            RowSheet.createElement(VerticalFormGroup, {
                items: [
                    {
                        iconLeft: "fa-phone", iconLeftBorder: true,
                        verticalForm: true, verticalFirst: true,
                    },
                    {
                        iconLeft: "fa-cog", iconLeftBorder: true,
                        verticalForm: true
                    },
                    {
                        iconLeft: "fa-cog", iconLeftBorder: true,
                        verticalForm: true, verticalLast: true,
                    },
                ]}),
            // ICONS RIGHT
            RowSheet.createElement(VerticalFormGroup, {
                items: [
                    {
                        iconRight: "fa-phone", iconRightBorder: true,
                        verticalForm: true, verticalFirst: true,
                    },
                    {
                        iconRight: "fa-phone", iconRightBorder: true,
                        verticalForm: true
                    },
                    {
                        iconRight: "fa-phone", iconRightBorder: true,
                        verticalForm: true, verticalLast: true,
                    },
                ]}),
            // DEFAULT 
            RowSheet.createElement(VerticalFormGroup, {
                items: [
                    {
                        verticalForm: true, verticalFirst: true,
                    },
                    {
                        verticalForm: true
                    },
                    {
                        verticalForm: true, verticalLast: true,
                    },
                ]}),
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}
