// import {wrapStore} from 'react-chrome-redux';
//
// const store;
//
// wrapStore(store, {portName: 'STOP_HARASSMENT'});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

// var elements = document.getElementsByTagName('*');
//
// for (var i = 0; i < elements.length; i++) {
//     var element = elements[i];
//
//     for (var j = 0; j < element.childNodes.length; j++) {
//         var node = element.childNodes[j];
//
//         if (node.nodeType === 3) {
//             var text = node.nodeValue;
//             var replacedText = text.replace(/\shate\s/gi, ' love ');
//             replacedText = replacedText.replace(/badword1/gi, ' All my friends have birthdays this year! ');
//             replacedText = replacedText.replace(/badword2/gi, ' I\'m pedaling backward!');
//
//             if (replacedText !== text) {
//                 element.replaceChild(document.createTextNode(replacedText), node);
//             }
//         }
//     }
// }
