import React from "react";
import {Doughnut} from 'react-chartjs-2';

export default class Chart extends React.Component {
  // render
  render() {
    var data = {labels: [
              		'Red',
              		'Green',
              		'Yellow'
              	],
              	datasets: [{
              		data: [300, 50, 100],
              		backgroundColor: [
              		'#FF6384',
              		'#36A2EB',
              		'#FFCE56'
              		],
              		hoverBackgroundColor: [
              		'#FF6384',
              		'#36A2EB',
              		'#FFCE56'
              		]
              	}]
              };
    return (
      <div>
        <Doughnut data={data} />
      </div>
    );
  }
}
