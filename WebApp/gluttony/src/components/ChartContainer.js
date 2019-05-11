import React from "react";
import {connect} from "react-redux";
import Chart from "./charts/Chart";
import PieChart from "./charts/PieChart";
import Header from './Header';
import {changeChart} from "./actions";



class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.toBarChart = () => {
      this.props.changeChart("BarChart");
    };
    this.toPieChart = () => {
      this.props.changeChart("PieChart");
    };
  }

  renderChart(){
    console.log("currentChart",this.props.chart.currentChart);
    if(this.props.chart.currentChart === "BarChart"){
      console.log("BarChart");
      return(<Chart/>);
    }else if(this.props.chart.currentChart === "PieChart"){
      console.log("PieChart");
      return(<PieChart/>);
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container mt-100">
          <div className="input-group">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.chart.currentChart}</button>
            <div className="dropdown-menu">
              <button className="dropdown-item " onClick={this.toBarChart} active>BarChart</button>
              <button className="dropdown-item" onClick={this.toPieChart}>PieChart</button>
            </div>
          </div>
          {this.renderChart()}
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    chart:state.chart
  };
}

export default connect(mapStateToProps,{changeChart})(MapContainer);
