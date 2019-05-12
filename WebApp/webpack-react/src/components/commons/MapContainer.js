import React from "react";
import Map from "./map/Map";
import Lengend from "./map/Lengend";
import Feature from "./map/Feature";
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
