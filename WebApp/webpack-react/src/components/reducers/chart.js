import {CHANGE_CHART} from '../utils/constants';
import chartsData from '../../data/chartsData.json';

const INITIAL_STATE = {
  currentChart:"BarChart",
  chartsData
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_CHART:
    console.log(CHANGE_CHART,action);
      return ({...state,currentChart:action.payload.name});
    default:
      return state;
  }
}
