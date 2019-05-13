import { combineReducers } from 'redux';
import feature from './feature';
import lengend from './lengend';
import chart from './chart';
import twrJson from '../../data/twrGeometry.json';
import aurinObese from '../../data/aurinObese.json';
import aurinOverweight from '../../data/aurinOverweight.json';


export default combineReducers({
  feature: feature,
  lengend: lengend,
  chart:chart,
  data: () => {
    return{
      twrJson:twrJson,
      aurinObese:aurinObese,
      aurinOverweight:aurinOverweight
    }
  }
});
