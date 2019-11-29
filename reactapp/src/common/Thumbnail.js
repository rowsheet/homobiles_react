import SETTINGS from '../settings';

export class Thumbnail extends React.Component {

    constructor(props) {
        super(props);
    }

    faIcon() {
        return (
            <i className={ "fas " + this.props.data } style={ faIconStyle }>
            </i>
        );
    }

    letters() {
        return (
            <div className="thumbnailLetters" style={ lettersStyle }>
                { this.props.data }
            </div>
        )
    }

    image() {
        return (
            <img src={ this.props.data } style={ imageStyle }/>
        );
    }

    unknown() {
        return (
            <i className="fas fa-question" style={ faIconStyle }>
            </i>
        );
    }

    render() {
        var thumbnail;
        if (!this.props.type) {
            console.error("Missing thumbnail type.");
            thumbnail = this.unknown();
        }
        if (!this.props.data) {
            console.error("Missing thumbnail data.");
            thumbnail = this.unknown();
        }
        switch (this.props.type) {
            case "fa_icon":
                thumbnail = this.faIcon();
                break;
            case "letters":
                thumbnail = this.letters();
                break;
            case "image":
                thumbnail = this.image();
                break;
            default:
                thumbnail = this.unknown();
        }
        return (
            <div className="Thumbnail" style={ thumbnailStyle }>
                { thumbnail }
            </div>
        );
    }
}

var thumbnailStyle = {
    width: "50px",
    height: "50px",
}

var lettersStyle = {
    background: SETTINGS.COLORS.pink,
    color: "white",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
}

var faIconStyle = {
    background: SETTINGS.COLORS.pink,
    color: "white",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
}

var imageStyle = {
    objectFit: "cover",
    height: "50px",
    width: "50px",
    borderRadius: "100%",
}

export default Thumbnail;
