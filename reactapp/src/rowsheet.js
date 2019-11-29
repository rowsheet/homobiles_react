import Debug from './debug';

/*------------------------------------------------------------------------------
PRIVATE
------------------------------------------------------------------------------*/

/*
 * Check if a component is a functional component.
 * (Not a class that extends React.Component)
 */

function isFunctionalComponent(Component) {
  return (
    typeof Component === 'function' // can be various things
    && !(
      Component.prototype // native arrows don't have prototypes
      && Component.prototype.isReactComponent // special property
    )
  );
}

/*
 * Check to see if a component is a real component.
 * (class extends React.Component).
 */

function isClassComponent(Component) {
  return !!(
    typeof Component === 'function'
    && Component.prototype
    && Component.prototype.isReactComponent
  );
}

/*
 * Get the name (as a string) of a function definition.
 * (Foo() => "Foo")
 */

function getFunctionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

/*
 * Get the name (as a string) of a component class that extends React.Component).
 * ( class Foo extends React.component => "Foo")
 */

function getComponentName(component) {
    var e = new component();
    var name = e.constructor.name;
    return name;
}

/*
 * Create the debug element.
 * Parse window.RS_DEBUG to tell weather or not to inject the Debug element,
 * otherwise return null.
 */

function getDebugElement(element, type) {
    var debug_element, name;
    if (window.RS_DEBUG) {
        if (type == "function") {
            name = getFunctionName(element);
            debug_element = React.createElement(Debug, {
                name: name,
            });
        }
        if (type == "component") {
            name = getComponentName(element);
            debug_element = React.createElement(Debug, {
                name: name,
            });
        }
    }
    return debug_element;
}

/*------------------------------------------------------------------------------
PUBLIC
------------------------------------------------------------------------------*/

/*
 * Same as React.Component, except it also does some type checking and for
 * saftey and injects debug elements when configured.
 *
 * Elements are wrapped in a <div>. First child is a Debug element if
 * window.RS_DEBUG == true.
 */

function createElement(element, props, ...children) {
    if (typeof(element) == "string") {
        console.log("GOT STRING: ");
        return React.createElement("div", {},
            getDebugElement(element, "function"),
            React.createElement(element, props, children),
        );
    }
    if (isFunctionalComponent(element)) {
        console.log("GOT FUNCTOIN:");
        return React.createElement("div", {},
            getDebugElement(element, "function"),
            React.createElement(element, props, children),
        );
    }
    if (isClassComponent(element)) {
        console.log("GOT COMPONENT");
        return React.createElement("div", {},
            getDebugElement(element, "component"),
            React.createElement(element, props, children),
        );
    }
}

var RowSheet = {
    createElement: createElement,
}

export default RowSheet;
