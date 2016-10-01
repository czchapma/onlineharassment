import {createStore} from 'redux';
import RootReducer from './reducers/root_reducer';

import {wrapStore} from 'react-chrome-redux';

//const defaultState = {
  //filter_status: 'on' or off
  //filter_types: { #filters and on or off?}
  //word settings...
  //words to filter: {}
//}

const store = createStore(RootReducer, { filter_status: 'off' });

wrapStore(store, {
  portName: 'STOP_HARASSMENT'
});
