const HarmfulWordsReducer = (state = ['pickles', 'rainbows', 'puppies'], action) => {
  switch(action.type){
    case 'ADD_WORD':
      return [...state, action.word];
      break;
    default:
      return state;
  }
}

export default HarmfulWordsReducer;
