import React, { Component } from 'react';
// import MapContainer from './MapContainer';
// import ChartContainer from './ChartContainer';
import Home from './commons/Home';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
