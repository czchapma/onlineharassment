import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

const filterOnType = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  let filter_options = state.filter_options;
  let filter_on = state.filter_on;

  var elements = document.getElementsByClassName('tweet');

  for (var i = 0; i < elements.length; i++) {
    var tweetElement = elements[i];
    var text = tweetElement.getElementsByClassName('tweet-text')[0];
    if (text) {

      harmful_words.forEach( word => {
        var regex = new RegExp(word, "gi");

        var text_content = text.textContent;
        //making new node to add and remove but still saves original text to retrieve later
        var parentNode = text.parentNode;
        var numChildren = parentNode.children.length;
        var newNode = text.cloneNode();
        var replacedText = text_content.replace(regex, 'I bet you sweat glitter!');
        newNode.innerHTML = replacedText;
        newNode.style.display = "inherit";

        //if tweet contains harmful word
        if (regex.test(text_content)) {

          //if filter is off
          if (!filter_on) {
            tweetElement.style.display = "inherit";
            text.style.display = "inherit";
            if (numChildren > 1){
              var lastChild = parentNode.lastChild;
              parentNode.removeChild(lastChild);
            };
          //hiding tweets
          } else if (filter_options.hide_tweets){
            if (numChildren > 1){
              var lastChild = parentNode.lastChild;
              parentNode.removeChild(lastChild);
            };
            tweetElement.style.display = "none";
          //substituting tweets
          } else if (filter_options.word_substitutes) {
            tweetElement.style.display = "inherit";
            text.style.display = "none";

            if (numChildren === 1){
              parentNode.appendChild(newNode);
            }
          }
        }
      });
    }
  }
}

const filter = function(){
  filterOnType();
  setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
