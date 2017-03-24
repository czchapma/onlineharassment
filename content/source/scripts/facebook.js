import { contains_misspelling } from './jaro_winkler';
console.log('in facebook');

const negative_comments = ['u_0_2t'];
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
    }
    let postContent = document.getElementsByClassName('userContent')[0].innerHTML;
    console.log(postContent);
  })
};

export default checkFacebookFilter;
