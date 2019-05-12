import { combineReducers } from 'redux';
import feature from './feature';
import lengend from './lengend';
import chart from './chart';

export default combineReducers({
  feature: feature,
  lengend: lengend,
  chart:chart
});
