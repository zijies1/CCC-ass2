import React, { Component } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {changeAurin} from "../../actions";

class Feature extends Component {

  constructor(props){
    super(props);
    this.toOverweight = () => {
      this.props.changeAurin("Overweight");
    };
    this.toObesity = () => {
      this.props.changeAurin("Obesity");
    };
  }

  render() {
    const {name,aurin} = this.props.feature;

    return (
      <div className="map-overlay2 text-dark" id="features">
       <div className="row">
        <div className="input-group">
          <div className="input-group-prepend">
            <button className="btn btn-primary" type="button">
              <Link to="/"><i className="fas fa-angle-left color-white "> Home </i></Link>
            </button>
          </div>
          <div className="input-group-prepend">
            <button className="btn btn-primary  dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div role="separator" className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>
          </div>
          <div className="input-group-prepend">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
            <div className="dropdown-menu">
              <div className="input-group-text bg-white map-check">
                <input type="checkbox" aria-label="Checkbox for following text input"/>
                <div className="input-group-append">
                  <span className="input-group-text map-check-item">Food</span>
                </div>
              </div>
              <div role="separator" className="dropdown-divider"></div>
              <div className="input-group-text bg-white map-check">
                <input type="checkbox" aria-label="Checkbox for following text input"/>
                <div className="input-group-append">
                  <span className="input-group-text map-check-item">Food</span>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>

       <div className="row mt-2">
         <div className="input-group">
           <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{aurin}</button>
           <div className="dropdown-menu">
             <button className="dropdown-item " onClick={this.toObesity} >Obesity</button>
             <button className="dropdown-item" onClick={this.toOverweight}>Overweight</button>
           </div>
         </div>
       </div>

       <div className="row mt-2">
         <div className="input-group">
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

export default connect(mapStateToProps,{changeAurin})(Feature);
