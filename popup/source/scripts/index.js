import React from 'react';
import {render} from 'react-dom';

import App from './components/main';

import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

window.Store = proxyStore;
console.log(proxyStore);
console.log(proxyStore.getState());
setTimeout(function() {
  console.log(proxyStore.getState());
}, 3000);

render(
  <Provider store={proxyStore}>
    <App />
  </Provider>,
  document.getElementById('content')
);
