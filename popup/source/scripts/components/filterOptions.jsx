import React, {Component} from 'react';

class FilterOptions extends React.Component{
  constructor(props){
    super(props)
  }

  setFilter(e){
    // e.preventDefault();
    this.props.checkFilterOption(e.currentTarget.value);
  }

  openSettings(){
    if (chrome.runtime.openOptionsPage) {
      // New way to open options pages, if supported (Chrome 42+).
      chrome.runtime.openOptionsPage();
    } else {
      // Reasonable fallback.
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  render(){
    let filters = this.props.filter_options;
    console.log(filters.hide_tweets, filters.word_substitutes, filters.option3);
    return (
      <div>
        <form>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="hide_tweets" onChange={this.setFilter.bind(this)} checked={filters.hide_tweets}/>
              Hide Tweets
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="word_substitutes" onChange={this.setFilter.bind(this)} checked={filters.word_substitutes}/>
              Word Substitutes
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="option3" onChange={this.setFilter.bind(this)} checked={filters.option3}/>
              Other Filter
            </label>
          </div>
        </form>
        <button onClick={this.openSettings}>Word Settings</button>
      </div>
    )
  }
};

export default FilterOptions;
