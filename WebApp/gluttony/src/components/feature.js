import React, { Component } from 'react';
import {connect} from 'react-redux';

class Feature extends Component {
  render() {
    const {name} = this.props.feature;
    return (
      <div className='map-overlay' id='features'>
        <h2>US population density</h2>
        <div id='pd'><p>{name}</p></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    feature:state.feature
  };
}

export default connect(mapStateToProps)(Feature);
