const HarmfulWordsReducer = (state = ['pickles', 'rainbows', 'puppies'], action) => {
  switch(action.type){
    case 'ADD_WORD':
      return [...state, action.word];
      break;
    case 'REMOVE_WORD':
      let index = state.indexOf(action.word);
      return [...state.slice(0, index), ...state.slice(index + 1)];
      break;
    default:
      return state;
  }
}

export default HarmfulWordsReducer;
