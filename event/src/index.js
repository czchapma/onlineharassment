import {createStore} from 'redux';
import RootReducer from './reducers/root_reducer';

//const defaultState = {
  //filter_status: 'on' or off
  //filter_types: { #filters and on or off?}
  //word settings...
  //words to filter: {}
//}

const store = createStore(RootReducer, { filter_status: 'on'});
