import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

const filter = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  console.log(harmful_words);

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

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
    proxyStore.subscribe(filter);
  // }
// );
