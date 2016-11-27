import {Store} from 'react-chrome-redux';
import $ from 'jQuery';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

const filterOnType = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  let filter_on = state.filter_on;

  var elements = document.getElementsByClassName('tweet');

  for (var i = 0; i < elements.length; i++) {
    var tweetElement = elements[i];
    var text = tweetElement.getElementsByClassName('tweet-text')[0];
    if (text) {

      harmful_words.forEach( word => {
        var regex = new RegExp(word, "gi");

        var text_content = text.textContent;

        //if tweet contains harmful word
        if (regex.test(text_content)) {

          //if filter is off
          if (!filter_on) {
            tweetElement.style = "inherit";

          //hiding tweets if negative sentiment
          } else {
            $.ajax({
              url: "https://localhost:3000/",
              type: "POST",
              data: {text: text_content},
              async: false,
              success: function (res) {
                if (res){
                  tweetElement.style.display = "none";
                }
              }
            });
          };

        }

      });

    }
  }
}

const filter = function(){
  filterOnType(); //can be removed?
  // setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
