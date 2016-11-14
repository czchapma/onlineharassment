import {Store} from 'react-chrome-redux';
import $ from 'jQuery';
// import AlchemyLanguageV1 from 'watson-developer-cloud/alchemy-language/v1';
// var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

// const alchemy_language = new AlchemyLanguageV1({
//   api_key: 'ca337bd9260cbf967aa5faa2fdd5c9ddbd7eae23'
// });

const params = {
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

// alchemy_language.sentiment(params, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });

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
        // var replacedText = text_content.replace(regex, 'I bet you sweat glitter!');
        // var replacedText = "You have purpose. Make your voice heard.";
        // newNode.innerHTML = replacedText;
        newNode.style = "inherit";

        //if tweet contains harmful word
        if (regex.test(text_content)) {
          if (numChildren > 1){
            var lastChild = parentNode.lastChild;
            parentNode.removeChild(lastChild);
          };
          //if filter is off
          if (!filter_on) {
            tweetElement.style = "inherit";
            text.style = "inherit";
            // if (numChildren > 1){
            //   var lastChild = parentNode.lastChild;
            //   parentNode.removeChild(lastChild);
            // };
          //hiding tweets
          } else if (filter_options.hide_tweets){
            // if (numChildren > 1){
            //   var lastChild = parentNode.lastChild;
            //   parentNode.removeChild(lastChild);
            // };
            tweetElement.style.display = "none";
          //substituting tweets
        } else if (filter_options.word_substitutes) {
            tweetElement.style.display = "inherit";
            text.style.display = "none";
            newNode.innerHTML = "You have purpose. Make your voice heard.";

            // if (numChildren === 1){
              parentNode.appendChild(newNode);
            // }
          } else if (filter_options.option3){
            tweetElement.style.display = "inherit";
            //blur
            text.style.display = "inherit";
            text.style.color = "transparent";
            text.style.textShadow = "0 0 5px rgba(0,0,0,0.5)";

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

const test = function(){
  let params = {
    text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
  };
  console.log('in test');
  $.ajax({
    url: "http://localhost:3000/",
    type: "POST",
    data: params,
    success: function (data) {
      console.log('success:', data);
    }
  });
  // var xmlhttp = new XMLHttpRequest();
  // xmlhttp.open("POST", "http://localhost:3000/", true);
  // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //
  // xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
  //     if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
  //         alert(xmlhttp.responseText);
  //     }
  // }
  // xmlhttp.send("Kate");
  console.log('end test');
}

proxyStore.subscribe(test);
