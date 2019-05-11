import React from "react";
import {Bar} from 'react-chartjs-2';

export default class Chart extends React.Component {
  // render
  render() {
    var data = {
      labels: ['Melbourne','Sydney','Brisbane','Perth'],
      datasets: [
        {
          label: '2015',
          backgroundColor: 'rgba(255,99,132,0.5)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.8)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81]
        },
        {
          label: '2016',
          backgroundColor: 'rgb(66,134,244,0.5)',
          borderColor: 'rgb(66,134,244,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(66,134,244,0.8)',
          hoverBorderColor: 'rgb(66,134,244,1)',
          data: [45, 39, 54, 57]
        },
        {
          label: '2017',
          backgroundColor: 'rgb(237,184,28,0.5)',
          borderColor: 'rgb(237,184,28,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(237,184,28,0.8)',
          hoverBorderColor: 'rgb(237,184,28,1)',
          data: [39, 21, 93,87]
        }
      ]
};
    return (
      <div>
        <Bar data={data} />
      </div>
    );
  }
}
