import {createStore} from 'redux';
import RootReducer from './reducers/root_reducer';

import {wrapStore} from 'react-chrome-redux';
import * as natural from './natural';

console.log(natural);


const store = createStore(
  RootReducer,
  {} //preloaded state
);

wrapStore(store, {
  portName: 'STOP_HARASSMENT'
});
