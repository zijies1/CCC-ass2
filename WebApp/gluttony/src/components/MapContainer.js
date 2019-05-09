import React from "react";
import Map from './Map';
import Lengend from './Lengend';
import Feature from './Feature';

class MapContainer extends React.Component {

  render() {
    return (
      <div>
         <Feature/>
         <Map/>
         <Lengend/>
      </div>
    )
  };
}


export default MapContainer;
