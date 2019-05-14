import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import { cyan500 } from 'material-ui/styles/colors';
import {setTime} from "../../actions";
import {connect} from "react-redux";

const styles = {
  root: {
    width: 200,
  },
  slider: {
    padding: '22px 0px',
  }
};


class StepSlider extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = (event, value) => {
      this.props.setTime(value);
    };
  }
  render() {
    const {time} = this.props.feature;
    const { classes } = this.props;
    console.log(time);

    return (
      <div className={classes.root}>
        <Slider
          classes={{ container: classes.slider }}
          value={time}
          min={0}
          max={24}
          step={6}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    feature:state.feature
  };
}

export default connect(mapStateToProps,{setTime})(withStyles(styles)(StepSlider));
