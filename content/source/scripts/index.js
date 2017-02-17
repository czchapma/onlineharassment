import {Store} from 'react-chrome-redux';
import checkTwitterFilter from './twitter';
import checkYoutubeFilter from './youtube';


// let tokenizer = new natural.WordTokenizer();
// console.log(tokenizer.tokenize("your dog has fleas."));

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

const filter = function(){
  const url = window.location.href;
  const youtube = /youtube\.com/;
  const twitter = /twitter\.com/;
  if (youtube.test(url)){
    checkYoutubeFilter(proxyStore);
  } else if (twitter.test(url)){
    checkTwitterFilter(proxyStore);
  } 
  // commented out to prevent exceeding daily limit of express https server
  // setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
