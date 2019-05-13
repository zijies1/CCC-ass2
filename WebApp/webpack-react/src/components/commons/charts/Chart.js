import React from "react";
import {Bar} from 'react-chartjs-2';

export default class Chart extends React.Component {
  // render
  render() {
    var data = {
      labels: ['Melbourne','Sydney','Brisbane','Perth'],
      datasets: [
        {
          label: '2014',
          backgroundColor: 'rgba(255,99,132,0.5)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.8)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.data[0]
        },
        {
          label: '2015',
          backgroundColor: 'rgb(66,134,244,0.5)',
          borderColor: 'rgb(66,134,244,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(66,134,244,0.8)',
          hoverBorderColor: 'rgb(66,134,244,1)',
          data: this.props.data[1]
        }
      ]
    };
    return (
      <div>
        <div className="display-4 text-dark text-center my-3">Number of gluttony related tweets for different cities in 2014&2015</div>
        <Bar data={data} />
      </div>
    );
  }
}
