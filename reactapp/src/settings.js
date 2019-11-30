function pixelValue(string) {
    return parseInt(string.substr(0,string.length - 2));
}

function pixelsPlus(setting, diff) {
    return pixelValue(setting) + diff + "px";
}

var COLORS = {
    purple: "#456EE6",
    pink: "#FF5070",
    sub_text: "#546DEC",
}
var THEME = {
    input_background: `linear-gradient(-45deg, ${COLORS.purple}, ${COLORS.pink})`,
    input_font_size: "1.1rem",
    input_padding: "7px",
    input_icon_padding: "10px",
    input_border_radius: "15px",
}
var SPACING = {
    row_item_spacing: "20px",
    content_spacing: "30px",
}
var SidebarProfileHeader = {
    style: {
        background: `linear-gradient(-45deg, ${COLORS.purple}, ${COLORS.pink})`,
    },
    default_image: "...",
    default_image_text: "add a photo!",
}
var RiderSidebar = {
    default_username: "Your Name",
    default_pronouns: "your pronouns",
}
var SETTINGS = {
    COLORS: COLORS,
    THEME: THEME,
    SPACING: SPACING,
    SidebarProfileHeader: SidebarProfileHeader,
    RiderSidebar: RiderSidebar,
    utils: {
        pixelsPlus: pixelsPlus,
    }
}
export default SETTINGS;
