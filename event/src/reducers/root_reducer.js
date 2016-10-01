import {combineReducers} from 'redux';
import FilterReducer from './filter_reducer';

const RootReducer = combineReducers({
  filter_on: FilterReducer
});

export default RootReducer;
