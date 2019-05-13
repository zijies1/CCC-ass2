import {CHANGE_FEATURE,CHANGE_AURIN} from '../utils/constants';

const options = {
  Obesity:{
    layers : ['0-1K', '1K-2K', '2K-1K0', '10K-50K', '50K-100K', '100K-150K', '150K-200K', '200K+'],
    colors : ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
  },
  Overweight:{
    layers : ['0-50K', '50K-100K', '100K-150K', '150K-200K', '200K-250K', '250K-300K',"300k-350k","350K"],
    colors : ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba','#6a51a3','#4a1486']
  }
};

const INITIAL_STATE = {
  name: "Hover over a state!",
  aurin: "Obesity",
  active: options.Obesity
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_FEATURE:
      return {
        ...state,
        name:action.payload.name
       };
     case CHANGE_AURIN:
       console.log(CHANGE_AURIN,action);
       return {
         ...state,
         aurin:action.payload.name,
         active: options[action.payload.name]
        };
    default:
      return state;
  }
}
