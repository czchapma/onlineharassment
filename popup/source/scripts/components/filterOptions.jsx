import React from 'react';

const FilterOptions = () => (
  <div>
    <form>
      <div className="radio">
        <label>
          <input type="radio" name="filter_options" value="hide_tweets" />
          Hide Tweets
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" name="filter_options" value="word_substitutes" />
          Word Substitutes
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" name="filter_options" value="option3" />
          Other Cool Option
        </label>
      </div>
    </form>
    <button>Word Settings</button>
  </div>
);

export default FilterOptions;
