import { combineReducers } from 'redux';
import feature from './feature';
import lengend from './lengend';


export default combineReducers({
  feature: feature,
  lengend: lengend
});
