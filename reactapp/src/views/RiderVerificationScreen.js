import TitlePadding from '../common/TitlePadding';
import PageTitle from '../common/PageTitle';
import SubText from '../common/SubText';
import PhoneForm from '../common/forms/PhoneForm';

import RowSheet from '../rowsheet';
import Debug from '../debug';

function Foo(props) {
    return (
        <h1>
            Foo: { props.name }
        </h1>
    );
}

class RiderVerificationScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return RowSheet.createElement("div", {},
            RowSheet.createElement(TitlePadding),
            RowSheet.createElement(PageTitle),
            RowSheet.createElement(SubText),
            RowSheet.createElement(PhoneForm),
            RowSheet.createElement(Foo, { name: "foo" }),
        );
    }
}

export default RiderVerificationScreen;
