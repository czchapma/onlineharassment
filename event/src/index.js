import {createStore} from 'redux';
import RootReducer from './reducers/root_reducer';

import {wrapStore} from 'react-chrome-redux';


const store = createStore(
  RootReducer,
  {} //preloaded state
);

wrapStore(store, {
  portName: 'STOP_HARASSMENT'
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     chrome.tabs.sendMessage(tabId, {greeting: "hello"}, function(response) {
//     console.log("in background");
//     });
// });
