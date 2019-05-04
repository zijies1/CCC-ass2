import { combineReducers } from 'redux';
import feature from './feature';
import lengend from './lengend';
import melJson from '../../data/melGeometry.json';
import vicJson from '../../data/vicGeometry.json';
import twrJson from '../../data/twrGeometry.json';

export default combineReducers({
  feature: feature,
  lengend: lengend,
  data: () => {
    return{
      melJson:melJson,
      vicJson:vicJson,
      twrJson:twrJson
    }
  }
});
