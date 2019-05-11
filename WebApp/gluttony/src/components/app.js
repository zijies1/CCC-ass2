import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Chart from './Chart';
import Home from './Home';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={MapContainer} />
          <Route path="/charts" component={Chart} />
        </div>
      </Router>
    );
  }
}

export default App;
