import {CHANGE_FEATURE} from '../utils/constants';

export function changeFeature(name) {
  return {
    type: CHANGE_FEATURE,
    payload: {
      name:name
    }
  };
}
