import {CHANGE_FEATURE} from '../utils/constants';

const INITIAL_STATE = {
  name: "Hover over a state!"
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_FEATURE:
      return {
        name:action.payload.name
       };
    default:
      return state;
  }
}
