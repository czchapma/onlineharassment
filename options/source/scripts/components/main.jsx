import React, {Component} from 'react';
import {connect} from 'react-redux'

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

  _handleKeyPress(e){
    this.setState({
      inputVal: e.target.value
    });
    // console.log(this.props.harmful_words.filter(word => {
    //   return word.includes(e.target.value);
    // }));
    console.log(e.target.value);
    console.log(this.state.inputVal);
  }

  render(){
    let word_list = this.props.harmful_words;
    let harmful_words = word_list ?
    <ul>
      {word_list.map((word, i) => {
        return (<li key={i}>{word}<button value={word} onClick={this.removeWord.bind(this)}>remove</button></li>);
      })}
    </ul>
      : <div></div>;
    return (
      <div>
        <h1>Stop Harassment Word Settings</h1>
        <input type="text" placeholder="Search" onKeyUp={this._handleKeyPress.bind(this)} />
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
