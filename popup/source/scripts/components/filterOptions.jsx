import React, {Component} from 'react';

class FilterOptions extends React.Component{
  constructor(props){
    super(props)
  }

  clicked(e){
    console.log(e.currentTarget.value);
  }

  render(){
    return (
      <div>
        <form>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="hide_tweets" onClick={this.clicked}/>
              Hide Tweets
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="word_substitutes" onClick={this.clicked}/>
              Word Substitutes
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="option3" onClick={this.clicked}/>
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
