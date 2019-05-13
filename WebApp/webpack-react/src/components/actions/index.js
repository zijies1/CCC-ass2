import {CHANGE_FEATURE,CHANGE_CHART,CHANGE_AURIN} from '../utils/constants';

export function changeFeature(name) {
  return {
    type: CHANGE_FEATURE,
    payload: {
      name:name
    }
  };
}

export function changeChart(name) {
  return {
    type: CHANGE_CHART,
    payload: {
      name:name
    }
  };
}


export function changeAurin(name) {
  return {
    type: CHANGE_AURIN,
    payload: {
      name:name
    }
  };
}
