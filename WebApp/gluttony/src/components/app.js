import React, { Component } from 'react';
import Map from './map';
// import Feature from './feature';
import Lengend from './lengend';
import Home from './Home';
import Header from './Header';
class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Home/>
      </div>
    );
  }
}

export default App;
