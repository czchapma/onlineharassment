import { contains_misspelling } from './jaro_winkler';

const negative_tweet_ids = [];
const positive_tweet_ids = [];

const users = {};

const checkForAbuse = function(username){
  if (users[username]){
    users[username] += 1;
    if (users[username] === 5) {
      alert('${username} has 5 negative tweets. Report user?');
    }
  } else {
    users[username] = 1;
  }
}

const checkTwitterFilter = function(state) {
  const harmful_words = state.harmful_words;
  const filter_on = state.filter_on;

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

          harmful_words.forEach(word => {
            let regex = new RegExp(word, "gi");
            let text_content = text.textContent;

            //if tweet contains harmful word
            if (regex.test(text_content) || contains_misspelling(text_content, word)) {
              //hiding tweets if negative sentiment using xmlhttprequest
              let xhr = new XMLHttpRequest();
              let data = "text=" + text_content + "&comment_id=" + tweetId;
              xhr.open('POST', "https://localhost:3000/");
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              xhr.onload = function() {
                if (xhr.status == 200) {
                  let res = xhr.responseText;
                  let jsonResponse = JSON.parse(res);
                  if (jsonResponse.negative){
                    negative_tweet_ids.push(jsonResponse.comment_id);
                    let badTweet = document.querySelectorAll("[data-tweet-id=\"" + jsonResponse.comment_id + "\"]")[0];
                    badTweet.style.display = "none";
                  } else {
                    positive_tweet_ids.push(jsonResponse.comment_id);
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
}

export default checkTwitterFilter;
