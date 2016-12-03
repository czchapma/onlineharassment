import {Store} from 'react-chrome-redux';
import $ from 'jQuery';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

//caching hateful tweets
let hateful_tweet_ids = [];
const filterOnType = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  let filter_on = state.filter_on;

  var elements = document.getElementsByClassName('tweet');

  //if filter off, go through hateful_tweet_ids to make them visible again
  if (!filter_on){
    hateful_tweet_ids.forEach(function(id){
      let unhide_tweet = $("[data-tweet-id=" + id + "]")[0];
      unhide_tweet.style = "inherit";
    }
  } else {

    for (var i = 0; i < elements.length; i++) {
      var tweetElement = elements[i];
      var tweetId = tweetElement.getAttribute('data-tweet-id');

      //if tweet already deemed hateful, just hide, don't make ajax call
      if (hateful_tweet_ids.includes(tweetId)){
        tweetElement.style.display = "none";
      //make ajax call to see sentiment of tweet
      } else {
        var text = tweetElement.getElementsByClassName('tweet-text')[0];
        if (text) {

          harmful_words.forEach( word => {
            var regex = new RegExp(word, "gi");

            var text_content = text.textContent;

            //if tweet contains harmful word
            if (regex.test(text_content)) {

              //if filter is off
            //   if (!filter_on) {
            //     tweetElement.style = "inherit";
            //
            //   //hiding tweets if negative sentiment
            // } else {
              $.ajax({
                url: "https://localhost:3000/",
                type: "POST",
                data: { text: text_content, tweet_id: tweetId },
                // async: false,
                success: function (res) {
                  if (res.negative){
                    hateful_tweet_ids.push(res.tweet_id);
                    var badTweet = $("[data-tweet-id=" + res.tweet_id + "]")[0];
                    badTweet.style.display = "none";
                    console.log(hateful_tweet_ids);
                  }
                }
              });

          }

        });

      }

    }

  }

  }
}

const filter = function(){
  filterOnType(); //can be removed?
  //commented out to prevent exceeding daily limit of express https server
  // setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
