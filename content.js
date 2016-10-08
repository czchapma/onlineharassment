import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

console.log(proxyStore.getStore());

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('adding listener');
    // if (request.greeting == "hello")
    //   sendResponse({farewell: "goodbye"});
  });

  



  // var displayPageAction = function (tabId, changeInfo, tab) {
  //   var match = regexAIESEC.exec(tab.url); // var regexAIESEC = new RegExp(/http:\/\/www.myaiesec.net\//);
  //   // We only display the Page Action if we are inside a MyAIESEC Tab.
  //   if(match && changeInfo.status == 'complete') {
  //       //We send the proper information to the content script to render our app.
  //       chrome.tabs.sendMessage(tab.id, {load: true}, function(response) { // We don't do anything if we don't have a response
  //       if(response) {
  //            console.log("Inside Background Response script, we had a response:");
  //            //After successfully getting the response, we show a Page Action Icon.
  //           chrome.pageAction.show(tab.id);
  //       }
  //   });
  //   }
  //   };


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
