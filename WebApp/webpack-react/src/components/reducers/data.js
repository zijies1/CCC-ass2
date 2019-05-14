import {ADD_DATA} from '../utils/constants';

const INITIAL_STATE = {
  twrJson:null,
  aurinObese:null,
  aurinOverweight:null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_DATA:
      console.log(ADD_DATA,action);
      return {...state,[action.payload.key]:action.payload.data}
    default:
      return state;
  }
}
