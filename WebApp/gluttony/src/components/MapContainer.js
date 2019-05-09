import React from "react";
import Map from "./Map";
import Lengend from "./Lengend";
import Feature from "./Feature";
class MapContainer extends React.Component {

  render() {
    return (
      <div class="wrapper">
         <Map/>
         <Lengend/>
         <Feature/>
      </div>
    )
  };
}


export default MapContainer;
