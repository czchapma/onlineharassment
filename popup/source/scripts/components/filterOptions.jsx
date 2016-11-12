import React, {Component} from 'react';

class FilterOptions extends React.Component{
  constructor(props){
    super(props)
  }

  setFilter(e){
    this.props.checkFilterOption(e.currentTarget.value);
  }

  openSettings(){
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  render(){
    let filters = this.props.filter_options;
    return (
      <div>
        <p>Choose your filter type:</p>
        <form>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="hide_tweets" onChange={this.setFilter.bind(this)} checked={filters.hide_tweets}/>
              Hide Me
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="word_substitutes" onChange={this.setFilter.bind(this)} checked={filters.word_substitutes}/>
              Replace Me
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="option3" onChange={this.setFilter.bind(this)} checked={filters.option3}/>
              Blur Me
            </label>
          </div>
        </form>
        <button onClick={this.openSettings}>Word Settings</button>
      </div>
    )
  }
};

export default FilterOptions;
