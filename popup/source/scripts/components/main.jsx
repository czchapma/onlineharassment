import React, {Component} from 'react';
import {connect} from 'react-redux';

import Switch from 'react-toggle-switch';

class App extends Component{
  constructor(props){
    super(props);
  }

  openSettings(){
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  render() {
    let filter_status = (this.props.filter_on) ? 'enabled' : 'disabled';
    let quotes = ["'Kind words can be short and easy to speak but their echoes are truly endless.' --Mother Theresa", "'You are braver than you believe, stronger than you seem, and smarter than you think.' --Christopher Robin", "'Be who you are and say what you feel, because those who mind don't matter and those who matter don't mind.' -- Dr. Seuss", "'One must always be careful of books and what is inside them, for words have the power to change us.' - Tessa Gray", "'Don't let the Muggles get you down.' --Ron Weasley", "'Try to be a rainbow in someone's cloud.' --Maya Angelou", "'No act of kindness, no matter how small, is ever wasted.' --Aesop", "'I have found that if you love life, life will love you back.' --Arthur Rubinstein", "'The best thing to hold onto in life is each other.' --Audrey Hepburn", "'Love is the only force capable of transforming an enemy into a friend.' --Martin Luther King, Jr."];
    let inspirational_quote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
      <div>
        <h1>Stop Harassment</h1>
        <h5>{inspirational_quote}</h5>
        <div>
          <h3>Word Filtering</h3>
          <Switch onClick={this.props.toggleFilter} on={this.props.filter_on}/>
        </div>
        <p>Application is {filter_status}</p>
        <button onClick={this.openSettings}>Word Settings</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter_on: state.filter_on,
    filter_options: state.filter_options
  };
};

const mapDispatchtoProps = dispatch => ({
  toggleFilter: () => dispatch({type: 'TOGGLE_FILTER'}),
  checkFilterOption: filter => dispatch({type: 'CHOOSE_FILTER', filter})
})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
  )(App);
