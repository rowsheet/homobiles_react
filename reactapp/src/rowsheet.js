function isFunctionalComponent(Component) {
  return (
    typeof Component === 'function' // can be various things
    && !(
      Component.prototype // native arrows don't have prototypes
      && Component.prototype.isReactComponent // special property
    )
  );
}

function isClassComponent(Component) {
  return !!(
    typeof Component === 'function'
    && Component.prototype
    && Component.prototype.isReactComponent
  );
}

function createElement(element, props) {
    if (typeof(element) == "string") {
        return element;
    }
    if (isFunctionalComponent(element)) {
        return React.createElement(element, props);
    }
    if (isClassComponent(element)) {
        return React.createElement(element, props);
    }
}

var RowSheet = {
    createElement: createElement,
}

export default RowSheet;
