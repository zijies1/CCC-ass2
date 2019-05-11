import React, { Component } from 'react';
import MapContainer from './MapContainer';
import ChartContainer from './ChartContainer';
import Home from './Home';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={MapContainer} />
          <Route path="/charts" component={ChartContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
