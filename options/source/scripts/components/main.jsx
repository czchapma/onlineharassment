import React, {Component} from 'react';
import {connect} from 'react-redux'

class App extends Component{
  constructor(props){
    super(props)
  }

  addWord(e){
    if (e.key === 'Enter') {
      this.props.addWord(e.target.value);
      e.target.value = '';
    }
  }

  removeWord(e){
    console.log(e.target, e.currentTarget);
  }

  render(){
    let word_list = this.props.harmful_words;
    let harmful_words = word_list ?
    <ul>
      {word_list.map((word, i) => {
        return (<li key={i}>{word}<button onClick={this.removeWord}>remove</button></li>);
      })}
    </ul>
      : <div></div>;
    return (
      <div>
        <h1>Stop Harassment Word Settings</h1>
        <h4>Word List</h4>
        <input type="text" placeholder='Add Word and Press Enter' onKeyPress={this.addWord.bind(this)} />
        <div>{harmful_words}</div>
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
