const initialState = true;

const FilterStatusReducer = function(state = initialState, action) {
  switch(action.type){
    case 'TOGGLE_FILTER':
      let toggled = state ? false : true; //to not mutate state
      return toggled;
      break;
    default:
      return state;
  }
}

export default FilterStatusReducer;
