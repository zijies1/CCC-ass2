import React, { Component } from 'react';
import MapContainer from './commons/MapContainer';
import ChartContainer from './commons/ChartContainer';
import Home from './commons/Home';
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
