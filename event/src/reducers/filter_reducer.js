const FilterReducer = function(state = {filter_status: 'on'}, action) {
  switch(action.type){
    case 'TOGGLE':
      console.log('toggle fired');
      if (state.filter_status === 'on') {
        return 'off'
      } else {
        return 'on'
      }
      break;
    default:
      return state;
  }
}

export default FilterReducer;
