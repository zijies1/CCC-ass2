import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import {changeFeature} from './actions';
import dataJson from '../geo.json';
mapboxgl.accessToken = 'pk.eyJ1IjoiemlqaWVzMSIsImEiOiJjanV3aTcwNjMwY3BtNDRxdDhsYTRnbTBmIn0.Uo9vbFX1xIGYsDhLxEu9hQ';

class Map extends Component {
  map;

  componentDidMount() {
    var features = dataJson.features;
    var hoveredStateId = null;
    var expression = ["match", ["get", "id"]];

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [145.214,-37.829],
      zoom: 8
    });

    this.map.on('load', () =>  {
      this.map.addSource("states", {
        "type": "geojson",
        "data": this.props.data
      });

      features.forEach((row) => {
        console.log(row.properties.density);
        var green = (row.properties.density / 8000) * 255;
        var color = "rgba(" + 10 + ", " + green + ", " + 123 + ", 1)";
        expression.push(row.id, color);
        console.log(row.id,color);
      });
      expression.push("rgba(0,0,0,0)");



      this.map.addLayer({
          "id": "state-fills",
          "type": "fill",
          "source": "states",
          "layout": {},
          "paint": {
          "fill-color": ["step",["get","density"],"#ffeda0",10,"#ffeda0",20,"#fed976",50,"#feb24c",100,"#fd8d3c",200,"#fc4e2a",500,"#e31a1c",1000,"#bd0026"],
          "fill-opacity": ["case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            0.4
          ]
        }
      });

      this.map.addLayer({
        "id": "state-borders",
        "type": "line",
        "source": "states",
        "layout": {},
        "paint": {
        "line-color": "#627BC1",
        "line-width": 2
        }
      });

      this.map.on("mousemove", "state-fills", (e)=> {
        console.log(e.features);
        if (e.features.length > 0) {
          this.props.changeFeature(e.features[0].properties.name + ":" + e.features[0].properties.density);
          if (hoveredStateId) {
          this.map.setFeatureState({source: 'states', id: hoveredStateId}, { hover: false});
          }
          hoveredStateId = e.features[0].id;
          this.map.setFeatureState({source: 'states', id: hoveredStateId}, { hover: true});
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on("mouseleave", "state-fills", ()=> {
        if (hoveredStateId) {
        this.map.setFeatureState({source: 'states', id: hoveredStateId}, { hover: false});
        }
        hoveredStateId =  null;
      });
    });



  }


  render() {
    return (
      <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
    );
  }
}

function mapStateToProps(state) {
  return {
    data:state.feature.data,
    active:state.feature.active
  };
}

export default connect(mapStateToProps, {changeFeature})(Map);
