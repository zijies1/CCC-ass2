import React, { Component } from 'react';
import { connect } from 'react-redux';

class Lengend extends Component {

  constructor(props) {
    super(props);
    this.renderLengends = this.renderLengends(this);
  }

  renderLengends(){
    const { layers, colors } = this.props.lengend;
    console.log(layers.length);
    return(
      <div>
        {layers.map((item, index) => (
          <span key={index}>
            <div>
              <span
                 className='legend-key'
                 style={{backgroundColor: colors[index]}}
                >
               </span>
               <span>
                 {item}
               </span>
             </div>
           </span>
        ))}
      </div>
    )

  }
  render() {
    return (
      <div className='map-overlay' id='legend'>
        {this.renderLengends}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lengend: state.lengend
  };
}

export default connect(mapStateToProps)(Lengend);
