import CoverContentLayout from './CoverContentLayout';
import Map from './Map';

export class MapForm extends React.Component {

    constructor(props) {
        super(props);
    }

    map() {
        return (
<Map></Map>
        )
    }

    form() {
        return (
<div id="MapForm_Form">
    <h1>FORM</h1>
    <h1>FORM</h1>
    <h1>FORM</h1>
</div>
        )
    }

    render() {
        return (
<div id="MapForm">
    <CoverContentLayout
            top={ this.map }
            bottom={ this.form }>
    </CoverContentLayout>
</div>
        );
    }
}

export default MapForm;
