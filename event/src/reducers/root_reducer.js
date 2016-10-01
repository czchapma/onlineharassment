import {combineReducers} from 'redux';
import FilterReducer from './filter_reducer';

const RootReducer = combineReducers({
  filter_status: FilterReducer
});

export default RootReducer;
