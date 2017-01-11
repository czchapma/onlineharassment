import {Store} from 'react-chrome-redux';

const proxyStore = new Store({
  portName: 'STOP_HARASSMENT'
});

//caching tweets
let negative_tweet_ids = [];
let positive_tweet_ids = [];

const toArray = function(text){
  var values = (text).replace(/\]/g,'');
  values = (values).replace(/\[/g, '');
  values = (values).replace(/\"/g, '');
  return values.split(',');
}

const checkFilter = function() {
  let state = proxyStore.getState();
  let harmful_words = state.harmful_words;
  let filter_on = state.filter_on;

  for (var i=0; i<harmful_words.length; i++){
    let areq = new XMLHttpRequest();
    let urlString = "https://localhost:3000/stem/" + harmful_words[i];
    areq.open('POST', urlString);
    areq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (i < harmful_words.length-1) { 
      areq.onload = function(){
        harmful_words = harmful_words.concat(toArray(areq.responseText));
      };
    } else {
      areq.onload = function(){
        harmful_words = harmful_words.concat(toArray(areq.responseText));

        //remove all duplicate entries in harmful_words
        harmful_words = harmful_words.filter(function(item, pos) {
          return harmful_words.indexOf(item) == pos;
        });
        console.log(harmful_words);

        let elements = document.getElementsByClassName('tweet');
        //if filter off, go through negative_tweet_ids to make them visible again
        if (!filter_on){
          negative_tweet_ids.forEach(function(id){
            let unhide_tweet = document.querySelectorAll("[data-tweet-id=\"" + id + "\"]")[0];
            unhide_tweet.style = "inherit";
          })
        } else {
          for (let i = 0; i < elements.length; i++) {
            let tweetElement = elements[i];
            let tweetId = tweetElement.getAttribute('data-tweet-id');

            //if tweet already deemed negative, just hide, don't make ajax call
            if (negative_tweet_ids.includes(tweetId)){
              tweetElement.style.display = "none";
            //if tweet already deemed positive, skip to next iteration;
            } else if (positive_tweet_ids.includes(tweetId)) {
              continue;
            //make ajax call to see sentiment of tweet
            } else {
              let text = tweetElement.getElementsByClassName('tweet-text')[0];
              if (text) {

                harmful_words.forEach( word => {
                  let regex = new RegExp(word, "gi");
                  let text_content = text.textContent;

                  //if tweet contains harmful word
                  if (regex.test(text_content)) {
                  //hiding tweets if negative sentiment using xmlhttprequest
                    let xhr = new XMLHttpRequest();
                    let data = "text=" + text_content + "&tweet_id=" + tweetId;
                    xhr.open('POST', "https://localhost:3000/");
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onload = function() {
                      if (xhr.status == 200) {
                        let res = xhr.responseText;
                        let jsonResponse = JSON.parse(res);
                        if (jsonResponse.negative){
                          negative_tweet_ids.push(jsonResponse.tweet_id);
                          let badTweet = document.querySelectorAll("[data-tweet-id=\"" + jsonResponse.tweet_id + "\"]")[0];
                          badTweet.style.display = "none";
                        } else {
                          positive_tweet_ids.push(jsonResponse.tweet_id);
                        }
                      }
                    };
                    xhr.send(data);
                  }
                })
              }
            }
          }
        }
      };
    }
    areq.send();
  }
}


const filter = function(){
  checkFilter();
  //commented out to prevent exceeding daily limit of express https server
  // setInterval(filterOnType, 1000);
}

proxyStore.subscribe(filter);
