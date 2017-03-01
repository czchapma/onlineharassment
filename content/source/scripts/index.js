import {Store} from 'react-chrome-redux';
import checkTwitterFilter from './twitter';
import checkYoutubeFilter from './youtube';
import checkFacebookFilter from './facebook';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

const filter = function(){
  const url = window.location.href;
  const youtube = /youtube\.com/;
  const twitter = /twitter\.com/;
  const facebook = /facebook\.com/;
  const state = proxyStore.getState();
  if (youtube.test(url)){
    checkYoutubeFilter(state);
  } else if (twitter.test(url)){
    checkTwitterFilter(state);
  } else if (facebook.test(url)){
    checkFacebookFilter(state);
  }
  // commented out to prevent exceeding daily limit of express https server
  // setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
