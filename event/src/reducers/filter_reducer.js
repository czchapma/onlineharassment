const FilterReducer = function(state = {filter_on: true}, action) {
  switch(action.type){
    case 'TOGGLE':
      return {filter_on: !state.filter_on};
      break;
    default:
      return state;
  }
}

export default FilterReducer;
