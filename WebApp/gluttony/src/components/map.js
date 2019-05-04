import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import {changeFeature} from './actions';
mapboxgl.accessToken = 'pk.eyJ1IjoiemlqaWVzMSIsImEiOiJjanV3aTcwNjMwY3BtNDRxdDhsYTRnbTBmIn0.Uo9vbFX1xIGYsDhLxEu9hQ';

class Map extends Component {
  map;

  componentDidMount() {
    var hoveredStateId = null;
    const {melJson,vicJson,twrJson} = this.props.data;
    // var twr = {
    //   type:twrJson.type,
    //   features:twrJson.features.slice(0,100)
    // }
    // console.log(twrJson);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [145.214,-37.829],
      zoom: 8
    });

    this.map.on('load', () =>  {
      this.map.addSource("melJson", {
        "type": "geojson",
        "data": melJson
      });
      this.map.addSource("vicJson", {
        "type": "geojson",
        "data": vicJson
      });
      // this.map.addSource("twrJson", {
      //   "type": "geojson",
      //   "data": twr
      // });



      this.map.addLayer({
          "id": "melJson-fills",
          "type": "fill",
          "source": "melJson",
          'maxzoom': 11,
          "layout": {},
          "paint": {
          "fill-color": ["step",["get","density"],"#ffeda0",100,"#ffeda0",200,"#fed976",500,"#feb24c",1000,"#fd8d3c",2000,"#fc4e2a",5000,"#e31a1c",10000,"#bd0026"],
          "fill-opacity": ["case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              0.4
            ]
          }
      });

      this.map.addLayer({
        "id": "melJson-borders",
        "type": "line",
        "source": "melJson",
        'maxzoom': 11,
        "layout": {},
        "paint": {
        "line-color": "#627BC1",
        "line-width": 2
        }
      });

      this.map.addLayer({
          "id": "vicJson-fills",
          "type": "fill",
          "source": "vicJson",
          'minzoom': 11,
          "layout": {},
          "paint": {
          "fill-color": ["step",["get","density"],"#ffeda0",100,"#ffeda0",200,"#fed976",500,"#feb24c",1000,"#fd8d3c",2000,"#fc4e2a",5000,"#e31a1c",10000,"#bd0026"],
          "fill-opacity": ["case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              0.4
            ]
          }
      });

      this.map.addLayer({
        "id": "vicJson-borders",
        "type": "line",
        "source": "vicJson",
        'minzoom': 11,
        "layout": {},
        "paint": {
        "line-color": "#627BC1",
        "line-width": 2
        }
      });

      this.map.on("mousemove", "melJson-fills", (e)=> {
        if (e.features.length > 0) {
          this.props.changeFeature(e.features[0].properties.name + ":" + e.features[0].properties.density);
          if (hoveredStateId) {
          this.map.setFeatureState({source: 'melJson', id: hoveredStateId}, { hover: false});
          }
          hoveredStateId = e.features[0].id;
          this.map.setFeatureState({source: 'melJson', id: hoveredStateId}, { hover: true});
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on("mouseleave", "melJson-fills", ()=> {
        if (hoveredStateId) {
        this.map.setFeatureState({source: 'melJson', id: hoveredStateId}, { hover: false});
        }
        hoveredStateId =  null;
      });




      this.map.on("mousemove", "vicJson-fills", (e)=> {
        // console.log(e);
        if (e.features.length > 0) {
          // this.props.changeFeature(e.features[0].properties.name + ":" + e.features[0].properties.density);
          if (hoveredStateId) {
          this.map.setFeatureState({source: 'vicJson', id: hoveredStateId}, { hover: false});
          }
          hoveredStateId = e.features[0].id;
          this.map.setFeatureState({source: 'vicJson', id: hoveredStateId}, { hover: true});
        }
      });

      this.map.on("click", (e)=> {
        // this.map.setZoom(this.map.getZoom()+1);
        this.map.flyTo({center: e.lngLat});
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on("mouseleave", "vicJson-fills", ()=> {
        if (hoveredStateId) {
        this.map.setFeatureState({source: 'vicJson', id: hoveredStateId}, { hover: false});
        }
        hoveredStateId =  null;
      });
    });

    // this.map.addLayer({
    //     "id": "twr-circle",
    //     "type": "circle",
    //     "source": "twrJson",
    //     'minzoom': 11,
    //     "layout": {},
    //     "paint": {
    //       "circle-color": "#020b26"
    //     }
    // });



  }


  render() {
    return (
      <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
    );
  }
}

function mapStateToProps(state) {
  return {
    data:state.data,
    active:state.feature.active
  };
}

export default connect(mapStateToProps, {changeFeature})(Map);
