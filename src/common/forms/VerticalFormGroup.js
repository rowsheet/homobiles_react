import SETTINGS from '../../settings';

import TextInput from './TextInput';

export default class VerticalFormGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="verticalFormGroup" style={ style }>
            { this.props.items.map(item => React.createElement(
                TextInput, item)) }
            </div>
        );
    }
}

var style = {
    borderRadius: SETTINGS.utils.pixelsPlus(
        SETTINGS.THEME.input_border_radius, 2),
    marginBottom: SETTINGS.THEME.input_border_radius,
    overflow: "hidden",
}
