const FilterReducer = function(state, action) {
  switch(action.type){
    case 'TURN_ON':
      return 'on';
      break;
    case 'TURN_OFF':
      return 'off';
      break;
    default:
      return 'on';
  }
}

export default FilterReducer;
