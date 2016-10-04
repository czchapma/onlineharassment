const FilterOptionsReducer = (state = { hide_tweets: false, word_substitutes: false, option3: false}, action) => {
  switch(action.type){
    case 'CHOOSE_FILTER':
      if (action.filter === 'hide_tweets') {
        return { hide_tweets: true, word_substitutes: false, option3: false };
      } else if (action.filter === 'word_substitutes') {
        return { hide_tweets: false, word_substitutes: true, option3: false };
      } else {
        return { hide_tweets: false, word_substitutes: false, option3: true };
      }
      break;
    default:
      return state;
  }
}

export default FilterOptionsReducer;
