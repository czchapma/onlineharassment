import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

//Removes the tweet entirely, previously known as filterAndRemove
//trying to refactor to write less code/combine
const filterOnType = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  let filter_options = state.filter_options; //testing
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
            if (numChildren === 1){
              parentNode.appendChild(newNode);
            }
            text.style.display = "none";
          }
        }
      });
    }
  }
}

//undoes filterAndRemove
const undoFilterAndRemove = function(){
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;

  var elements = document.getElementsByClassName('tweet');

  for (var i = 0; i < elements.length; i++) {
    var tweetElement = elements[i];
    var text = tweetElement.getElementsByClassName('tweet-text')[0];
    if (text) {
      harmful_words.forEach( word => {
        var regex = new RegExp(word, "gi");
        if (regex.test(text.textContent)) {
          tweetElement.style.visibility = "visible";
        }
      });
    }
  }
}

//Replaces the tweet with a nice phrase
const filterAndReplace = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;

  var elements = document.getElementsByTagName('*');

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];
      console.log(node);
      if (node.nodeType === 3) {
        var text = node.nodeValue;
        harmful_words.forEach( word => {
          var regex = new RegExp(word, "gi");
          var replacedText = text.replace(regex, 'I bet you sweat glitter!');
          if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
          }
        })
      }
    }
  }
}

const filter = function(){
  // let state = proxyStore.getState();

  // if (state.filter_on) {
    filterOnType();
    setInterval(filterOnType, 1000);
  // };
}

proxyStore.subscribe(filter);
