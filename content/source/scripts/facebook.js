import { contains_misspelling } from './jaro_winkler';
console.log('in facebook');

const negative_comments = [];
const positive_comments = [];

const turnOnFilter = function(harmful_words){

  let posts = Array.from(document.getElementsByClassName('userContentWrapper'));
  console.log(posts);
  posts.forEach(post => {
    let postId = post.parentNode.getAttribute('id');
    console.log(postId, postId === negative_comments[0]);
    if (negative_comments.includes(postId)){
      post.style.display = 'none';
    } else if (positive_comments.includes(postId)){
      console.log('already deemed positive');
    } else {
      let postContent = post.getElementsByClassName('userContent')[0].firstChild;
      if (postContent) {
        let postText = postContent.getElementsByTagName('p')[0].innerHTML;
        harmful_words.forEach(word => {
          let regex = new RegExp(word, "gi");

          if (regex.test(postText) || contains_misspelling(postText, word)) {
            let xhr = new XMLHttpRequest();
            let data = `text=${postText}&comment_id=${postId}&username=""`;
            xhr.open('POST', "https://localhost:3000/");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
              if (xhr.status == 200) {
                let res = xhr.responseText;
                let jsonResponse = JSON.parse(res);
                if (jsonResponse.negative){
                  negative_comments.push(jsonResponse.comment_id);
                  let badComment = document.querySelectorAll(`[id="${jsonResponse.comment_id}"]`)[0];
                  badComment.style.display = "none";
                  console.log(negative_comments);
                } else {
                  positive_comments.push(jsonResponse.comment_id);
                }
              }
            };
            xhr.send(data);
          }
        })
      }
    }
  })
};

const checkFacebookFilter = function(state){
  const harmful_words = state.harmful_words;
  const filter_on = state.filter_on;

  if (filter_on){
    turnOnFilter(harmful_words);
  } else {
    negative_comments.forEach(id => {
      let commentToDisplay = document.querySelectorAll(`[id="${id}"]`)[0];
      commentToDisplay.style.display = 'inherit';
    })
  }
}

export default checkFacebookFilter;
