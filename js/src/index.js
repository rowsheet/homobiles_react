class App extends React.Component {
     render() {
          return (
               <div>
                    This is: {this.props.name}
               </div>
          );
     }
}

ReactDOM.render(
     <App name="Homobiles" />,
     document.getElementById('App')
);
