import {combineReducers} from 'redux';
import FilterStatusReducer from './filter_status_reducer';
import FilterOptionsReducer from './filter_options_reducer';
import HarmfulWordsReducer from './harmful_words_reducer';

const RootReducer = combineReducers({
  filter_on: FilterStatusReducer,
  filter_options: FilterOptionsReducer,
  harmful_words: HarmfulWordsReducer
});

export default RootReducer;
