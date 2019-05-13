import React, { Component } from "react";
import { connect } from "react-redux";
import mapboxgl from "mapbox-gl";
import {changeFeature} from "../../actions";
mapboxgl.accessToken = "pk.eyJ1IjoiemlqaWVzMSIsImEiOiJjanV3aTcwNjMwY3BtNDRxdDhsYTRnbTBmIn0.Uo9vbFX1xIGYsDhLxEu9hQ";

class Map extends Component {

  componentDidUpdate(){
    // console.log(this.props.feature);
    if (this.props.feature.aurin === "Obesity") {
      this.map.setLayoutProperty("aurinOverweight-fills", "visibility", "none");
      this.map.setLayoutProperty("aurinObese-fills", "visibility", "visible");
    } else {
      this.map.setLayoutProperty("aurinObese-fills", "visibility", "none");
      this.map.setLayoutProperty("aurinOverweight-fills", "visibility", "visible");
    }

  }

  renderPoints(data,name){
    var clusters = "clusters-" + name;
    var clusterCount = "cluster-count-" + name;
    var unclusteredPoint = "unclustered-point-" + name;

    this.map.addSource(name, {
      "type": "geojson",
      "data": data,
      "cluster": true,
      "clusterMaxZoom": 14, //Max zoom to cluster points on
      "clusterRadius": 50 //Radius of each cluster when clustering points (defaults to 50)
    });

    this.map.addLayer({
        "id": clusters,
        "type": "circle",
        "source": name,
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
      "id": clusterCount,
      "type": "symbol",
      "source": name,
      "filter": ["has", "point_count"],
      "layout": {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12
      }
    });

    this.map.addLayer({
      "id": "unclusteredPoint",
      "type": "circle",
      "source": name,
      "filter": ["!", ["has", "point_count"]],
      "paint": {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
      }
    });

    // // When the mouse leaves the state-fill layer, update the feature state of the
    // // previously hovered feature.
    this.map.on("mouseleave",clusters, ()=> {
      this.map.getCanvas().style.cursor = "";
    });

    this.map.on("click", clusters, (e) => {
      var features = this.map.queryRenderedFeatures(e.point, { layers: [clusters] });
      var clusterId = features[0].properties.cluster_id;
      this.map.getSource(name).getClusterExpansionZoom(clusterId, (err, zoom)=> {
        if (err){return;}
        this.map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
      });
    });

    this.map.on("click", "unclusteredPoint", (e) => {
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

    this.map.on("mouseenter", clusters, () => {
      this.map.getCanvas().style.cursor = "pointer";
    });

  }

  componentDidMount() {
    console.log(this.props.data);
    var hoveredObId = null;
    var hoveredOwId = null;
    const {aurinObese,aurinOverweight} = this.props.data;
    var {twrJson} = this.props.data;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: this.props.map.center,
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


      this.map.addLayer({
          "id": "aurinObese-fills",
          "type": "fill",
          "source": "aurinObese",
          "layout": {},
          "paint": {
          "fill-color": ["step",["get","density"],"#ffeda0",1000,"#ffeda0",2000,"#fed976",10000,"#feb24c",50000,"#fd8d3c",100000,"#fc4e2a",150000,"#e31a1c",200000,"#bd0026"],
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
            "fill-color": ["step",["get","density"],'#fcfbfd',50000,'#efedf5',100000,'#dadaeb',150000,'#bcbddc',200000,'#9e9ac8',250000,'#807dba',300000,'#6a51a3',350000,'#4a1486'],
            "fill-opacity": ["case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.7
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

      this.renderPoints(twrJson,"twrJson");

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
          if (hoveredObId) {
            this.map.setFeatureState({source: "aurinObese", id: hoveredObId}, { hover: false});
          }
          hoveredObId = e.features[0].id;
          this.map.setFeatureState({source: "aurinObese", id: hoveredObId}, { hover: true});
        }
      });


      this.map.on("mousemove", "aurinOverweight-fills", (e)=> {
        if (e.features.length > 0) {
          this.props.changeFeature(e.features[0].properties.name + "("+ this.props.feature.aurin + ")" + ":" + e.features[0].properties.density);
          if (hoveredOwId) {
            this.map.setFeatureState({source: "aurinOverweight", id: hoveredOwId}, { hover: false});
          }
          hoveredOwId = e.features[0].id;
          this.map.setFeatureState({source: "aurinOverweight", id: hoveredOwId}, { hover: true});
        }
      });


      this.map.on("mouseleave", "aurinOverweight-fills", ()=> {
        if (hoveredOwId) {
          this.map.setFeatureState({source: "aurinOverweight", id: hoveredOwId}, { hover: false});
        }
        hoveredOwId =  null;
      });

      this.map.on("mouseleave","aurinObese-fills", ()=> {
        if (hoveredObId) {
          this.map.setFeatureState({source: "aurinObese", id: hoveredObId}, { hover: false});
        }
        hoveredObId =  null;
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
    feature:state.feature,
    map:state.map
  };
}

export default connect(mapStateToProps, {changeFeature})(Map);
