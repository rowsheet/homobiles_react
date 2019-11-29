import ItemList from '../common/ItemList';
import RowSheet from '../rowsheet';

export class DemoItemList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return RowSheet.createElement(
            ItemList, this.props.DemoItemList);
    }
}

export default DemoItemList;
