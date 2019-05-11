import React from "react";
import Chart from "./Chart";
import Header from './Header';

class MapContainer extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <div class="container mt-100">
           <Chart/>
        </div>
      </div>
    )
  };
}


export default MapContainer;
