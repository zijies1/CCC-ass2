import {SET_CENTER} from '../utils/constants';

const centers = [
  [145.214,-37.829],
  [151.209900, -33.865143],
  [115.857048, -31.953512],
  [153.0234,-27.471]
];
const INITIAL_STATE = {
  center:centers[0]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CENTER:
      return ({center:centers[action.payload.key]});
    default:
      return state;
  }
}
