import {CHANGE_CHART} from '../utils/constants';

const INITIAL_STATE = {
  currentChart:"BarChart"
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_CHART:
    console.log(CHANGE_CHART,action);
      return ({currentChart:action.payload.name});
    default:
      return state;
  }
}
