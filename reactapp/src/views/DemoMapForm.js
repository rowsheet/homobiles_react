import ContentSplit from '../common/ContentSplit';
import Map from '../common/Map';

export class DemoMapForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var map = this.map;
        var form = this.form;
        return (
<div id="DemoMapForm">
    <ContentSplit
            top={ this.map }
            bottom={ this.form }>
    </ContentSplit>
</div>
        );
    }

    map() {
        return (
<Map></Map>
        )
    }

    form() {
        return (
<div id="DemoMapForm_Form">
    <h1>FORM</h1>
    <h1>FORM</h1>
    <h1>FORM</h1>
</div>
        )
    }
}

export default DemoMapForm;
