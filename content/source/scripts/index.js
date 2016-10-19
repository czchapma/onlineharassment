import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

//Removes the tweet entirely, previously known as filterAndRemove
//trying to refactor to combine?
const filterOnType = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  let filter_options = state.filter_options; //testing

  var elements = document.getElementsByClassName('tweet');

  for (var i = 0; i < elements.length; i++) {
    var tweetElement = elements[i];
    var text = tweetElement.getElementsByClassName('tweet-text')[0];
    if (text) {
      text = text.toLowerCase();
      harmful_words.forEach( word => {
        var regex = new RegExp(word, "gi");
        var text_content = text.textContent;
        if (regex.test(text_content)) {
          if (filter_options.hide_tweets){
            tweetElement.style.visibility = "hidden";
          } else if (filter_options.word_substitutes) {
            tweetElement.style.visibility = "visible";
            var replacedText = text_content.replace(regex, 'I bet you sweat glitter!');
            text.innerHTML = replacedText;
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
        // var replacedText = text.replace(/test_word/gi, ' I bet you sweat glitter! ');
        // replacedText = replacedText.replace(/badword1/gi, ' All my friends have birthdays this year! ');
        // replacedText = replacedText.replace(/badword2/gi, ' I\'m pedaling backward!');

      }
    }
  }
}

const filter = function(){
  let state = proxyStore.getState();

  if (state.filter_on) {
    filterOnType();
  };
  // let filter_options = state.filter_options;
  // if (filter_options.hide_tweets){
  //   filterAndRemove();
  // } else if (filter_options.word_substitutes){
  //   undoFilterAndRemove();
  //   filterAndReplace();
  // } else if (filter_options.option3){
  //   console.log('options 3');
  // }
}

proxyStore.subscribe(filter);
