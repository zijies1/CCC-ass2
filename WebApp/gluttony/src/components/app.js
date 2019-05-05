import React, { Component } from 'react';
import Map from './map';
// import Feature from './feature';
import Lengend from './lengend';


class App extends Component {
  render() {
    return (
      <div>
        <Map/>
        <Lengend/>
      </div>
    );
  }
}

export default App;
