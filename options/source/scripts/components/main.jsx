import React, {Component} from 'react';
import {connect} from 'react-redux'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let harmful_words = this.props.harmful_words;
    return (
      <div>
        <h1>Stop Harassment Word Settings</h1>
        <h4>Word List</h4>
        <li>
          {harmful_words.map(word => {
            <ul>{word}</ul>
          })}
        </li>
      </div>
    )
  }
}

const mapStateToProps = state => {
  harmful_words: state.harmful_words
}

export default connect(
  mapStateToProps
  )(App);
