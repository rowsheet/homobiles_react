import Item from './ItemList/Item';
import RowSheet from '../rowsheet';

export class ItemList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var use_border = this.props.use_border || false;
        var use_thumbnail = this.props.use_thumbnail || false;
        var use_button = this.props.use_button || false;
        var items = this.props.items.map(
            item => RowSheet.createElement(Item, {...item, ...{
                use_border: use_border,
                use_thumbnail: use_thumbnail,
                use_button: use_button,
            }}));
        return (
<div id="ItemList">
    <h1>
        List
    </h1>
            { items }
</div>
        );
    }
}

export default ItemList;
