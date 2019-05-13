import React from "react";
import Map from "./map/Map";
import Legend from "./map/Legend";
import Feature from "./map/Feature";
class MapContainer extends React.Component {

  render() {
    return (
      <div className="wrapper">
         <Map/>
         <Legend/>
         <Feature/>
      </div>
    )
  };
}


export default MapContainer;
