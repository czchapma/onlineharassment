import { contains_misspelling } from './jaro_winkler';
console.log('in facebook');

const negative_comments = [];
const positive_comments = [];

const checkFacebookFilter = function(state){
  const harmful_words = state.harmful_words;
  const filter_on = state.filter_on;
  let posts = Array.from(document.getElementsByClassName('userContentWrapper'));
  posts.forEach(post => {
    let postId = post.parentNode.getAttribute('id');
    console.log(postId, postId === negative_comments[0]);
    if (negative_comments.includes(postId)){
      post.style.display = 'none';
    } else if (positive_comments.includes(postId)){
      console.log('already deemed positive');
    } else {
      let postContent = document.getElementsByClassName('userContent')[0].innerHTML;
      console.log(postContent);
      harmful_words.forEach(word => {
        let regex = new RegExp(word, "gi");

        if (regex.test(postContent) || contains_misspelling(postContent, word)) {
          let xhr = new XMLHttpRequest();
          let data = `text=${postContent}&comment_id=${postId}&username=""`;
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
  })
};

export default checkFacebookFilter;
