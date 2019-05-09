import React, { Component } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";


class Feature extends Component {
  render() {
    const {name} = this.props.feature;
    return (
      <div className="map-overlay2 text-dark" id="features">
        <div className="input-group">
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button">
              <Link to="/"><i className="fas fa-angle-left"> Home </i></Link>
            </button>
          </div>
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div role="separator" className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>
          </div>
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
            <div className="dropdown-menu">
              <div className="input-group-text bg-white map-check">
                <input type="checkbox" aria-label="Checkbox for following text input"/>
                <div class="input-group-append">
                  <span class="input-group-text map-check-item">Food</span>
                </div>
              </div>
              <div role="separator" className="dropdown-divider"></div>
              <div className="input-group-text bg-white map-check">
                <input type="checkbox" aria-label="Checkbox for following text input"/>
                <div class="input-group-append">
                  <span class="input-group-text map-check-item">Food</span>
                </div>
              </div>
            </div>
          </div>
          <div className="input-group-append">
            <span className="input-group-text"> {name}</span>
          </div>
        </div>
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
