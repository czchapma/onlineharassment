const initialState = true;

const FilterReducer = function(state = initialState, action) {
  switch(action.type){
    case 'TOGGLE_FILTER':
      let toggled = state ? false : true;
      return toggled;
      break;
    default:
      return state;
  }
}

export default FilterReducer;
