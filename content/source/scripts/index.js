import {Store} from 'react-chrome-redux';
import checkTwitterFilter from './twitter';
import checkYoutubeFilter from './youtube';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

const filter = function(){
  const url = window.location.href;
  const youtube = /youtube\.com/;
  const twitter = /twitter\.com/;
  const state = proxyStore.getState();
  if (youtube.test(url)){
    checkYoutubeFilter(state);
  } else if (twitter.test(url)){
    checkTwitterFilter(state);
  }
  // commented out to prevent exceeding daily limit of express https server
  // setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
