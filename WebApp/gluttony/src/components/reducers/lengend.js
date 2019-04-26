const INITIAL_STATE = {
  layers : ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'],
  colors : ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
