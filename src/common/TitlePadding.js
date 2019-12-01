export default class TitlePadding extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement("div", { style: {...style, ...{
            height: this.props.height || style.height,
        }}});
    }

}

var style = {
    height: "60px",
}
