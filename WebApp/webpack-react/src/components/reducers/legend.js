const INITIAL_STATE = {
  obese:{
    layers : ['0-1K', '1K-2K', '2K-1K0', '10K-50K', '50K-100K', '100K-150K', '150K-200K', '200K+'],
    colors : ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
  },
  overweight:{
    layers : ['0-10K', '10K-50K', '50K-100K', '100K-150K', '150K-250K', '250K+'],
    colors : ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f']
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
