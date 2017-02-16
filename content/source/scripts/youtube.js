import Jaro_Winkler from './jaro_winkler';
import $ from 'jQuery';
// import scraper from 'youtube-comment-scraper';

//caching tweets
let negative_comments = [];
let positive_comments = [];

const contains_misspelling = function(text_content, word) {
  let jw = new Jaro_Winkler(0.7, 0.1);
  let words = text_content.split(" ");
  let misspelled = false;

  words.forEach(tweet_word => {
    if (jw.dist(tweet_word.toLowerCase(), word.toLowerCase()) >= .85) {
      misspelled = true;
    }
  })

  return misspelled;
}

const checkYoutubeFilter = function(store) {
  let state = store.getState();
  let harmful_words = state.harmful_words;
  let filter_on = state.filter_on;

  function checkIsLoading() {
		var isLoading = $('#watch-discussion').find('.action-panel-loading').length;
    console.log(isLoading);
		if (isLoading) {
			setTimeout(function() {
				checkIsLoading();
			}, 500);
		} else {
			console.log("Comment section loaded.");

			var commentCount = $('.comment-thread-renderer').length;
      var comments = $('.comment-renderer');
      console.log(comments);
      comments.each((index, element) => {
        var el = $(element);
        var comment = el.find('.comment-renderer-text-content:first').text();
        if (comment.includes('Brooke')){
          el.css('display', 'none');
        }
        console.log(comment);
      })
		}
	}

  checkIsLoading();
  // setTimeout(() => {
  //   let comments = $(".comment-renderer");
  //   comments.push('test');
  //   comments.each(function(index, element){
  //     var el = $(element);
  //     console.log('inside each function');
  //   })
  // }, 3000);
};

  //if filter off, go through negative_tweet_ids to make them visible again
//   if (!filter_on){
//     negative_tweet_ids.forEach(function(id){
//       let unhide_tweet = document.querySelectorAll("[data-tweet-id=\"" + id + "\"]")[0];
//       unhide_tweet.style = "inherit";
//     })
//   } else {
//
//     for (let i = 0; i < elements.length; i++) {
//       let tweetElement = elements[i];
//       let tweetId = tweetElement.getAttribute('data-tweet-id');
//
//       //if tweet already deemed negative, just hide, don't make ajax call
//       if (negative_tweet_ids.includes(tweetId)){
//         tweetElement.style.display = "none";
//       //if tweet already deemed positive, skip to next iteration;
//       } else if (positive_tweet_ids.includes(tweetId)) {
//         continue;
//       //make ajax call to see sentiment of tweet
//       } else {
//         let text = tweetElement.getElementsByClassName('tweet-text')[0];
//         if (text) {
//
//           harmful_words.forEach(word => {
//             let regex = new RegExp(word, "gi");
//             let text_content = text.textContent;
//
//             //if tweet contains harmful word
//             if (regex.test(text_content) || contains_misspelling(text_content, word)) {
//               //hiding tweets if negative sentiment using xmlhttprequest
//               let xhr = new XMLHttpRequest();
//               let data = "text=" + text_content + "&tweet_id=" + tweetId;
//               xhr.open('POST', "https://localhost:3000/");
//               xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//               xhr.onload = function() {
//                 if (xhr.status == 200) {
//                   let res = xhr.responseText;
//                   let jsonResponse = JSON.parse(res);
//                   if (jsonResponse.negative){
//                     negative_tweet_ids.push(jsonResponse.tweet_id);
//                     let badTweet = document.querySelectorAll("[data-tweet-id=\"" + jsonResponse.tweet_id + "\"]")[0];
//                     badTweet.style.display = "none";
//                   } else {
//                     positive_tweet_ids.push(jsonResponse.tweet_id);
//                   }
//                 }
//               };
//               xhr.send(data);
//             }
//           })
//         }
//       }
//     }
//   }
// }

export default checkYoutubeFilter;
