import { contains_misspelling } from './jaro_winkler';

const negative_comments = [];
const positive_comments = [];

const checkFacebookFilter = function(state){
  const harmful_words = state.harmful_words;
  const filter_on = state.filter_on;
  let posts = Array.from(document.getElementsByClassName('UserContent'));
  posts.forEach(post => {
    
  })
};

export default checkFacebookFilter;
