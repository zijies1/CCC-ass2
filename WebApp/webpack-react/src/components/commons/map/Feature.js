import React, { Component } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {changeAurin} from "../../actions";
import {TIME_PERIODS} from "../../utils/constants";
import StepSlider from './StepSlider';

class Feature extends Component {

  constructor(props){
    super(props);
    this.toOverweight = () => {
      this.props.changeAurin("Overweight");
    };
    this.toObesity = () => {
      this.props.changeAurin("Obesity");
    };
    this.setTime = (e) =>{
      if(this.props.feature.time[e.target.value] === "dropdown-item active"){
        this.props.setTime(e.target.value,"dropdown-item");
      }else{
        this.props.setTime(e.target.value,"dropdown-item active");
      }
    }

  }

  render() {
    // <div className="input-group-prepend">
    //   <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
    //   <div className="dropdown-menu">
    //     <div className="input-group-text bg-white map-check">
    //       <input type="checkbox" aria-label="Checkbox for following text input"/>
    //       <div className="input-group-append">
    //         <span className="input-group-text map-check-item">Food</span>
    //       </div>
    //     </div>
    //     <div role="separator" className="dropdown-divider"></div>
    //     <div className="input-group-text bg-white map-check">
    //       <input type="checkbox" aria-label="Checkbox for following text input"/>
    //       <div className="input-group-append">
    //         <span className="input-group-text map-check-item">Food</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    const {name,aurin,time} = this.props.feature;
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
            <span className="input-group-text pl-2 pr-3">
              <span className="mr-2">Select time periods:</span>
              <StepSlider root="py-2" />
              <span className="ml-2">0 - {time}</span>
            </span>
          </div>
        </div>
       </div>

       <div className="row mt-2">
         <div className="input-group">
           <div className="input-group-prepend">
            <span className="btn btn-primary"> Aurin data </span>
           </div>
           <div className="input-group-append">
             <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{aurin}</button>
             <div className="dropdown-menu">
               <button className="dropdown-item " onClick={this.toObesity} >Obesity</button>
               <button className="dropdown-item" onClick={this.toOverweight}>Overweight</button>
             </div>
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
