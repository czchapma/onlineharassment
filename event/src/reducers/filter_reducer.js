const FilterReducer = function(state = {filter_status: 'on'}, action) {
  switch(action.type){
    case 'TURN_ON':
      return 'on';
      break;
    case 'TURN_OFF':
      return 'off';
      break;
    default:
      return state;
  }
}

export default FilterReducer;
