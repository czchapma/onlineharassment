import Jaro_Winkler from './jaro_winkler';
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

function checkIsLoading(harmful_words) {
  let isLoading = document.getElementById('watch-discussion').getElementsByClassName('action-panel-loading').length;
  if (isLoading) {
    setTimeout(function() {
      checkIsLoading(harmful_words);
    }, 500);
  } else {
    console.log("Comment section loaded.");
    let comments = Array.from(document.getElementsByClassName('comment-renderer'));
    comments.forEach(comment => {
      let commentId = comment.getAttribute('data-cid');
      if (negative_comments.includes(commentId)){
        comment.style.display = 'none';
      // } else if (positive_comments.includes(comment)){
      //   continue;
      } else {
        let textContent = comment.getElementsByClassName('comment-renderer-text-content')[0].innerHTML;

        harmful_words.forEach(word => {
          let regex = new RegExp(word, "gi");

          //if tweet contains harmful word
          if (regex.test(textContent) || contains_misspelling(textContent, word)) {
            //hiding tweets if negative sentiment using xmlhttprequest
            let xhr = new XMLHttpRequest();
            let data = "text=" + textContent + "&comment_id=" + commentId;
            xhr.open('POST', "https://localhost:3000/");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
              if (xhr.status == 200) {
                let res = xhr.responseText;
                let jsonResponse = JSON.parse(res);
                if (jsonResponse.negative){
                  negative_comments.push(jsonResponse.comment_id);
                  let badComment = document.querySelectorAll("[data-cid=\"" + jsonResponse.comment_id + "\"]")[0];
                  badComment.style.display = "none";
                } else {
                  positive_comments.push(jsonResponse.comment_id);
                }
              }
            };
            xhr.send(data);
          }
        })
      }

    })
  }
}

const checkYoutubeFilter = function(store) {
  let state = store.getState();
  let harmful_words = state.harmful_words;
  let filter_on = state.filter_on;


  if (!filter_on){
    negative_comments.forEach(id => {
      let commentToHide = document.querySelectorAll("[data-cid=\"" + id + "\"]")[0];
      commentToHide.style.display = 'inline';
    })
  } else {
    checkIsLoading(harmful_words);
  }
};

export default checkYoutubeFilter;
