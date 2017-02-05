import {Store} from 'react-chrome-redux';
import checkTwitterFilter from './twitter';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

const filter = function(){
  checkTwitterFilter(proxyStore);
  // commented out to prevent exceeding daily limit of express https server
  // setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
