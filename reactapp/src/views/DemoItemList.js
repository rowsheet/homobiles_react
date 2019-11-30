import TitlePadding from '../common/TitlePadding';
import PageTitle from '../common/PageTitle';
import ItemList from '../common/ItemList';
import ContentSplitFitTop from '../common/ContentSplitFitTop';

import RowSheet from '../rowsheet';
import SETTINGS from '../settings';

export default class DemoItemList extends React.Component {

    constructor(props) {
        super(props);
        this.top = this.top.bind(this);
        this.bottom = this.bottom.bind(this);
    }

    top() {
        var page_title = "Demo Item List";
        return RowSheet.createElement("div", { style: style },
            RowSheet.createElement(TitlePadding),
            RowSheet.createElement(PageTitle,
                { value: page_title, centered: false, bold: true }),
        );
    }

    bottom() {
        return RowSheet.createElement("div", {},
            RowSheet.createElement(ItemList,
                this.props.DemoItemList),
        );
    }

    render() {
        var top = this.top;
        var bottom = this.bottom;
        return (
<div id="DemoItemList">
    <ContentSplitFitTop
            top={ top }
            bottom={ bottom }>
    </ContentSplitFitTop>
</div>
        );
    }
}

var style = {
    paddingLeft: SETTINGS.SPACING.content_spacing,
    paddingRight: SETTINGS.SPACING.content_spacing,
}
