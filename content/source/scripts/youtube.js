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
  const harmfulWords = harmful_words;
  let isLoading = document.getElementById('watch-discussion').getElementsByClassName('action-panel-loading').length;
  if (isLoading) {
    setTimeout(function() {
      checkIsLoading();
    }, 500);
  } else {
    console.log("Comment section loaded.");
    let comments = Array.from(document.getElementsByClassName('comment-renderer'));
    comments.forEach(comment => {
      if (negative_comments.includes(comment)){
        comment.style.display = 'none';
        console.log('in caching');
      // } else if (positive_comments.includes(comment)){
      //   continue;
      } else {
        let textContent = comment.getElementsByClassName('comment-renderer-text-content')[0].innerHTML;
        console.log(harmfulWords);
        harmfulWords.forEach(word => {
          let regex = new RegExp(word, "gi");

          //if tweet contains harmful word
          if (regex.test(textContent) || contains_misspelling(textContent, word)) {
            //hiding tweets if negative sentiment using xmlhttprequest
            let xhr = new XMLHttpRequest();
            let data = "text=" + textContent + "&tweet_id=" + comment;
            xhr.open('POST', "https://localhost:3000/");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
              if (xhr.status == 200) {
                let res = xhr.responseText;
                let jsonResponse = JSON.parse(res);
                if (jsonResponse.negative){
                  negative_comments.push(jsonResponse.tweet_id);
                  jsonResponse.tweet_id.style.display = 'none';
                } else {
                  positive_comments.push(jsonResponse.tweet_id);
                }
              }
            };
            xhr.send(data);
          }
        })
        // if (text.includes('Jessie')){
        //   negative_comments.push(comment);
        //   comment.style.display = 'none';
        // }
      }

    })
  }
}

const checkYoutubeFilter = function(store) {
  let state = store.getState();
  let harmful_words = state.harmful_words;
  let filter_on = state.filter_on;


  if (!filter_on){
    negative_comments.forEach(comment => {
      comment.style.display = 'inline';
    })
  } else {
    console.log(harmful_words);
    checkIsLoading(harmful_words);
  }
};

export default checkYoutubeFilter;
