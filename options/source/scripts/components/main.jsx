import React, {Component} from 'react';
import {connect} from 'react-redux';
import linkState from 'react-link-state'; //deprecated, but working?

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      inputVal: ''
    }
  }

  addWord(e){
    if (e.key === 'Enter') {
      this.props.addWord(e.target.value);
      e.target.value = '';
    }
  }

  removeWord(e){
    console.log(e.target.value);
    this.props.removeWord(e.target.value);
  }

  render(){
    let harmful_words = this.props.harmful_words;
    let word_list = this.props.harmful_words || [];
    let filtered_words = word_list.filter(word => {
      return word.includes(this.state.inputVal);
    }) //list of words in the full list that include what has been typed in search
    let autocomplete =
    <ul>
      {filtered_words.map((word, i) => {
        return (<li key={i}>{word}<button value={word} onClick={this.removeWord.bind(this)}>remove</button></li>);
      })}
    </ul>
    return (
      <div>
        <h1>Stop Harassment Word Settings</h1>
        <input type="text" placeholder="Search" valueLink={linkState(this, 'inputVal')} />
        <h4>Word List</h4>
        <input type="text" placeholder='Add Word and Press Enter' onKeyPress={this.addWord.bind(this)} />
        <div>{autocomplete}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    filter_options: state.filter_options,
    harmful_words: state.harmful_words
});

const mapDispatchToProps = dispatch => ({
  addWord: word => dispatch({type: 'ADD_WORD', word}),
  removeWord: word => dispatch({type: 'REMOVE_WORD', word})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
