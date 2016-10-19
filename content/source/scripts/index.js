import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

//Removes the tweet entirely
const filterAndRemove = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  console.log(harmful_words);

  var elements = document.getElementsByClassName('tweet');

  for (var i = 0; i < elements.length; i++) {
    var tweetElement = elements[i];
    var text = tweetElement.getElementsByClassName('tweet-text')[0];
    if (text) {
      text = text.toLowerCase();
      harmful_words.forEach( word => {
        var regex = new RegExp(word, "gi");
        if (regex.test(text.textContent)) {
          tweetElement.style.visibility = "hidden";
        }
      });
    }
  }
}

//undoes filterAndRemove
const undoFilterAndRemove = function(){
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  console.log(harmful_words);

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
      if (node.nodeType === 3) {
        var text = node.nodeValue;
        harmful_words.forEach( word => {
          var regex = new RegExp(word, "gi");
          var replacedText = text.replace(regex, 'I bet you sweat glitter!');
          if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
          }
        })
        // var replacedText = text.replace(/test_word/gi, ' I bet you sweat glitter! ');
        // replacedText = replacedText.replace(/badword1/gi, ' All my friends have birthdays this year! ');
        // replacedText = replacedText.replace(/badword2/gi, ' I\'m pedaling backward!');

      }
    }
  }
}

const filter = function(){
  let state = proxyStore.getState();
  let filter_options = state.filter_options;

  //Only run if the filter is enabled
  if (state.filter_on) {
    if (filter_options.hide_tweets){
      filterAndRemove();
    } else if (filter_options.word_substitutes){
      undoFilterAndRemove();
      filterAndReplace();
    } else if (filter_options.option3){
      console.log('options 3');
    }
  }
}

proxyStore.subscribe(filter);
