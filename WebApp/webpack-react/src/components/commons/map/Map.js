import React, { Component } from "react";
import { connect } from "react-redux";
import mapboxgl from "mapbox-gl";
import {changeFeature} from "../../actions";
mapboxgl.accessToken = "pk.eyJ1IjoiemlqaWVzMSIsImEiOiJjanV3aTcwNjMwY3BtNDRxdDhsYTRnbTBmIn0.Uo9vbFX1xIGYsDhLxEu9hQ";

class Map extends Component {
  componentDidUpdate(){
    console.log(this.props.feature.aurin);
    if (this.props.feature.aurin === "Obesity") {
      this.map.setLayoutProperty("aurinOverweight-fills", "visibility", "none");
      this.map.setLayoutProperty("aurinObese-fills", "visibility", "visible");
    } else {
      this.map.setLayoutProperty("aurinObese-fills", "visibility", "none");
      this.map.setLayoutProperty("aurinOverweight-fills", "visibility", "visible");
    }
  }
  componentDidMount() {
    console.log(this.props.data);
    var hoveredausId = null;
    var hoveredVicId = null;
    const {aurinObese,aurinOverweight} = this.props.data;
    var {twrJson} = this.props.data;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [145.214,-37.829],
      zoom: 8
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on("load", () =>  {
      this.map.addSource("aurinObese", {
        "type": "geojson",
        "data": aurinObese
      });
      this.map.addSource("aurinOverweight", {
        "type": "geojson",
        "data": aurinOverweight
      });
      this.map.addSource("twrJson", {
        "type": "geojson",
        "data": twrJson,
        "cluster": true,
        "clusterMaxZoom": 14, // Max zoom to cluster points on
        "clusterRadius": 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.addLayer({
          "id": "aurinObese-fills",
          "type": "fill",
          "source": "aurinObese",
          "layout": {},
          "paint": {
          "fill-color": ["step",["get","density"],"#ffeda0",1000,"#ffeda0",2000,"#fed976",5000,"#feb24c",100000,"#fd8d3c",200000,"#fc4e2a",500000,"#e31a1c",1000000,"#bd0026"],
          "fill-opacity": ["case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              0.4
            ]
          }
      });

      this.map.addLayer({
        "id": "aurinObese-borders",
        "type": "line",
        "source": "aurinObese",
        "layout": {},
        "paint": {
        "line-color": "#627BC1",
        "line-width": 2
        }
      });

      this.map.addLayer({
          "id": "aurinOverweight-fills",
          "type": "fill",
          "source": "aurinOverweight",
          "layout": {},
          "paint": {
            "fill-color": ["step",["get","density"],"#f2f0f7",1000,"#dadaeb",2000,"#bcbddc",5000,"#9e9ac8",100000,"#756bb1",200000,"#54278f"],
            "fill-opacity": ["case",
                ["boolean", ["feature-state", "hover"], false],
                0.8,
                0.4
              ]
          }
      });

      this.map.addLayer({
        "id": "aurinOverweight-borders",
        "type": "line",
        "source": "aurinOverweight",
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

      if (this.props.feature.aurin === "Obesity") {
        this.map.setLayoutProperty("aurinOverweight-fills", "visibility", "none");
        this.map.setLayoutProperty("aurinObese-fills", "visibility", "visible");
      } else {
        this.map.setLayoutProperty("aurinObese-fills", "visibility", "none");
        this.map.setLayoutProperty("aurinOverweight-fills", "visibility", "visible");
      }

      this.map.on("mousemove", "aurinObese-fills", (e)=> {
        if (e.features.length > 0) {
          this.props.changeFeature(e.features[0].properties.name + "("+ this.props.feature.aurin + ")" + ":" + e.features[0].properties.density);
          if (hoveredausId) {
            this.map.setFeatureState({source: "aurinObese", id: hoveredausId}, { hover: false});
          }
          hoveredausId = e.features[0].id;
          this.map.setFeatureState({source: "aurinObese", id: hoveredausId}, { hover: true});
        }
      });


      this.map.on("mousemove", "aurinOverweight-fills", (e)=> {
        if (e.features.length > 0) {
          this.props.changeFeature(e.features[0].properties.name + "("+ this.props.feature.aurin + ")" + ":" + e.features[0].properties.density);
          if (hoveredVicId) {
            this.map.setFeatureState({source: "aurinOverweight", id: hoveredVicId}, { hover: false});
          }
          hoveredVicId = e.features[0].id;
          this.map.setFeatureState({source: "aurinOverweight", id: hoveredVicId}, { hover: true});
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      this.map.on("mouseleave", "aurinOverweight-fills", "aurinObese-fills","clusters", ()=> {
        this.map.getCanvas().style.cursor = "";
        // if (hoveredVicId) {
        //   this.map.setFeatureState({source: "aurinOverweight", id: hoveredVicId}, { hover: false});
        // }
        if (hoveredausId) {
          this.map.setFeatureState({source: "aurinObese", id: hoveredausId}, { hover: false});
        }
        hoveredausId =  null;
        // hoveredVicId =  null;
      });

      this.map.on("click", "clusters", (e) => {
        var features = this.map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        var clusterId = features[0].properties.cluster_id;
        this.map.getSource("twrJson").getClusterExpansionZoom(clusterId, (err, zoom)=> {
          if (err){return;}
          this.map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
      });

      this.map.on("click", "unclustered-point", (e) => {
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

      this.map.on("mouseenter", "clusters", () => {
        this.map.getCanvas().style.cursor = "pointer";
      });
    });
  }

  render_layer(){

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
    feature:state.feature
  };
}

export default connect(mapStateToProps, {changeFeature})(Map);
