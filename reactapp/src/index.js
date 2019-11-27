import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Foo from './views/Foo';
import Bar from './views/Bar';
import Baz from './views/Baz';
import Home from './views/Home';

/* Note:
 * React-Router is not the right tool for this job and should be removed.
 */

var component_routes = {
    "/foo": Foo,
    "/bar": Bar,
    "/baz": Baz,
    "/": Home,
}

class App extends React.Component {
    render() {
        var nav_links = Object.keys(component_routes).map(route => (
            <li><Link to={ route }>{ route }</Link></li>));
        var routes = Object.keys(component_routes).map(route => (
            <Route path={ route }>{ React.createElement(
                component_routes[route]) }</Route>));

        /*----------------------------------------------------------------------
         * Toggle Nav
        ----------------------------------------------------------------------*/
        var show_nav = false;
        /*
        var show_nav = true;
        */
        if (show_nav == true) {
            var nav = (<nav><ul>{ nav_links.map( link => link) }</ul></nav>);
        } else { var nav = null; }

        return (
<Router>
    <div>
        { nav }
        <Switch>
            { routes.map( route => route ) }
        </Switch>
    </div>
</Router>
        );
    }
}

ReactDOM.render(
     <App name="Homobiles" />,
     document.getElementById('App')
);
