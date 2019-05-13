import React from "react";
import {Doughnut} from 'react-chartjs-2';

export default class Chart extends React.Component {
  // render
  render() {
    var data = {labels: this.props.pieChart_d.labels,
              	datasets: [{
              		data: this.props.pieChart_d.data,
              		backgroundColor: [
              		'#FF6384',
              		'#36A2EB',
              		'#FFCE56',
                  '#43f260',
                  '#c834e2'
              		],
              		hoverBackgroundColor: [
              		'#FF6384',
              		'#36A2EB',
              		'#FFCE56',
                  '#43f260',
                  '#c834e2'
              		]
              	}]
              };
    return (
      <div>
        <div className="display-6 text-dark my-1"> {this.props.pieChart_d.city}</div>
        <Doughnut data={data} />
      </div>
    );
  }
}
