import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Foo from "./views/Foo";

function Home() {
  return <h2>Home</h2>;
}

function Bar() {
  return <h2>Bar</h2>;
}

function Baz() {
  return <h2>Baz</h2>;
}

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
            <Route path={ route }>{ React.createElement(component_routes[route]) }</Route>));
        return (
<Router>
    <div>
        <nav>
            <ul>
                { nav_links.map( link => link) }
            </ul>
        </nav>
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
