import SETTINGS from '../../settings';

import RowSheet from '../../rowsheet';
import Thumbnail from '../Thumbnail';
import Button from '../Button';

export class Item extends React.Component {

    constructor(props) {
        super(props);
    }

    left() {
        if (this.props.use_thumbnail) {
            return (
            <div className="listItemLeft" style={ listItemLeftStyle }>
                { RowSheet.createElement(Thumbnail, this.props.thumbnail) }
            </div>
            );
        }
        return "";
    }

    center() {
        var title = this.props.title || "";
        var sub_title = this.props.sub_title || "";
        var listItemTitleStyle = flexTextStyle;
        // If it's not a spacer and there's no sub-title, center the
        // title in the middle by adding some margin. FTW.
        if (sub_title == "" && this.props.type != "spacer") {
            listItemTitleStyle = {...flexTextStyle, marginTop: "13px"};
        }
        return (
            <div className="listItemCenter" style={ listItemCenterStyle }>
                <div className="listItemTitle">
                    <h3 style={ listItemTitleStyle }>
                        { title }
                    </h3>
                </div>
                <div className="listItemSubTitle">
                    <h5 className="sub_title_text" style={ flexTextStyle }>
                        { sub_title }
                    </h5>
                </div>
            </div>
        );
    }

    right() {
        if (this.props.use_button) {
            return (
                <div className="listItemRight" style={ listItemRightStyle }>
                    { RowSheet.createElement(Button, this.props.button) }
                </div>
            );
        }
        return "";
    }

    style() {
        if (this.props.use_border == true) {
            return {
                display: "flex",
                borderBottom: "1px solid #ccc",
                padding: "5px",
            };
        }
        return {};
    }

    render() {
        var right = this.right();
        var left = this.left();
        var style = this.style();
        if (this.props.type == "spacer") {
            left = "";
            right = "";
            listItemCenterStyle = {
                ...listItemCenterStyle,
                color: SETTINGS.COLORS.pink,
            }
        }
        var center = this.center();
        return (
            <div style={ style }>
                { left }
                { center }
                { right }
            </div>
        );
    }
}
var flexTextStyle = {
    margin: "0px",
    textOverflow: "ellipsis",
    overflow: "hidden",
}

var listItemCenterStyle = {
    width: "100%",
    paddingLeft: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
}

var listItemRightStyle = {
    paddingLeft: "5px",
    maxWidth: "200px",
    flex: "0 0 auto",
    paddingTop: "15px",
}

var listItemLeftStyle = {
    height: "50px",
    width: "50px",
}

export default Item;
