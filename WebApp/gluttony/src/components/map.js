import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import {changeFeature} from './actions';
mapboxgl.accessToken = 'pk.eyJ1IjoiemlqaWVzMSIsImEiOiJjanV3aTcwNjMwY3BtNDRxdDhsYTRnbTBmIn0.Uo9vbFX1xIGYsDhLxEu9hQ';

class Map extends Component {
  map;

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/zijies1/cjuwmb7j35kqp1flhdo9dp8xb',
      center: [-96, 40],
      zoom: 3.6
    });

    this.map.on('load', () =>  {
      this.map.on('mousemove', (e) => {
        var states = this.map.queryRenderedFeatures(e.point, {
          layers: ['statedata']
        });
        if (states.length > 0) {
          const { density, name } =  states[0].properties;
          this.props.changeFeature(name+ ":"+ density);
        } else {
          this.props.changeFeature("Hover over a state!");
        }
      });
    });
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
    );
  }
}

export default connect(null, {changeFeature})(Map);
