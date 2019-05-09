import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Home from './Home';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={MapContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
