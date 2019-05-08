import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import {changeFeature} from './actions';
mapboxgl.accessToken = 'pk.eyJ1IjoiemlqaWVzMSIsImEiOiJjanV3aTcwNjMwY3BtNDRxdDhsYTRnbTBmIn0.Uo9vbFX1xIGYsDhLxEu9hQ';

class Map extends Component {
  map;

  componentDidMount() {
    var hoveredMelId = null;
    var hoveredVicId = null;
    const {melJson,vicJson} = this.props.data;
    var {twrJson} = this.props.data;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [145.214,-37.829],
      zoom: 8
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () =>  {
      this.map.addSource("melJson", {
        "type": "geojson",
        "data": melJson
      });
      this.map.addSource("vicJson", {
        "type": "geojson",
        "data": vicJson
      });
      this.map.addSource("twrJson", {
        "type": "geojson",
        "data": twrJson,
        "cluster": true,
        "clusterMaxZoom": 14, // Max zoom to cluster points on
        "clusterRadius": 50 // Radius of each cluster when clustering points (defaults to 50)
      });

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

      this.map.addLayer({
          "id": "clusters",
          "type": "circle",
          "source": "twrJson",
          "filter": ["has", "point_count"],
          "layout": {},
          "paint": {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1"
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40
            ]
          }
      });

      this.map.addLayer({
        "id": "cluster-count",
        "type": "symbol",
        "source": "twrJson",
        "filter": ["has", "point_count"],
        "layout": {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
        }
      });

      this.map.addLayer({
        "id": "unclustered-point",
        "type": "circle",
        "source": "twrJson",
        "filter": ["!", ["has", "point_count"]],
        "paint": {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
        }
      });

      this.map.on("mousemove", "melJson-fills", (e)=> {
        if (e.features.length > 0) {
          this.props.changeFeature(e.features[0].properties.name + ":" + e.features[0].properties.density);
          if (hoveredMelId) {
          this.map.setFeatureState({source: 'melJson', id: hoveredMelId}, { hover: false});
          }
          hoveredMelId = e.features[0].id;
          this.map.setFeatureState({source: 'melJson', id: hoveredMelId}, { hover: true});
        }
      });

      this.map.on("mousemove", "vicJson-fills", (e)=> {
        if (e.features.length > 0) {
          this.props.changeFeature(e.features[0].properties.name + ":" + e.features[0].properties.density);
          if (hoveredVicId) {
            this.map.setFeatureState({source: 'vicJson', id: hoveredVicId}, { hover: false});
          }
          hoveredVicId = e.features[0].id;
          this.map.setFeatureState({source: 'vicJson', id: hoveredVicId}, { hover: true});
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on("mouseleave", "vicJson-fills", "melJson-fills",'clusters', ()=> {
        this.map.getCanvas().style.cursor = '';
        // if (hoveredVicId) {
        //   this.map.setFeatureState({source: 'vicJson', id: hoveredVicId}, { hover: false});
        // }
        if (hoveredMelId) {
          this.map.setFeatureState({source: 'melJson', id: hoveredMelId}, { hover: false});
        }
        hoveredMelId =  null;
        // hoveredVicId =  null;
      });

      this.map.on('click', 'clusters', (e) => {
        var features = this.map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        this.map.getSource('twrJson').getClusterExpansionZoom(clusterId, (err, zoom)=> {
          if (err){return;}
          this.map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
      });

      this.map.on('click', 'unclustered-point', (e) => {
        console.log(e.features);
        if(e.features.length > 0){
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.message;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map);
        }
      });

      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer';
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
    data:state.data,
    active:state.feature.active
  };
}

export default connect(mapStateToProps, {changeFeature})(Map);
