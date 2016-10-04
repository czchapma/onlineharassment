import React, {Component} from 'react';

class FilterOptions extends React.Component{
  constructor(props){
    super(props)
  }

  set_filter(e){
    let filter = e.currentTarget.value;
    console.log(e.currentTarget.value);
    this.props.dispatch({type: 'CHOOSE_FILTER'}, filter: filter);
    // this.props.checkFilterOption(filter);
    // console.log(this.props.checkFilterOption);
    // console.log(e.currentTarget.checked);
  }

  render(){
    let filters = this.props.filter_options;
    console.log(filters);
    return (
      <div>
        <form>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="hide_tweets" onClick={this.set_filter.bind(this)} checked={filters.hide_tweets}/>
              Hide Tweets
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="word_substitutes" onClick={this.set_filter.bind(this)} checked={filters.word_substitutes}/>
              Word Substitutes
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="option3" onClick={this.set_filter.bind(this)} checked={filters.options3}/>
              Other Cool Option
            </label>
          </div>
        </form>
        <button>Word Settings</button>
      </div>
    )
  }
};

export default FilterOptions;
