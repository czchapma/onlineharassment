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

  showCross(element){
    var reference = element["i"];
    this.refs[reference].style.visibility = "visible";
  }

  hideCross(element){
    var reference = element["i"];
    this.refs[reference].style.visibility = "hidden";
  }

  iToString(i){
    return i + '';
  }

  render(){
    let harmful_words = this.props.harmful_words;
    let word_list = this.props.harmful_words || [];
    let filtered_words = word_list.filter(word => {
      return word.includes(this.state.inputVal);
    }) //list of words in the full list that include what has been typed in search
    let autocomplete =
    <ul id="autocompleteList">
      {filtered_words.map((word, i) => {
        return (
            <li className="wordItem" onMouseOut={this.hideCross.bind(this, {i})} onMouseOver={this.showCross.bind(this, {i})} key={i}>{word}<button style={{visibility : "hidden"}} ref={i} className="removeButton pull-right" value={word} onClick={this.removeWord.bind(this)}>X</button></li>);
      })}
    </ul>
    return (
        <div id="outer" className="container">
          <div id="title">
            <h1>Stop Harassment Word Settings</h1>
            <h4 id="subtitle">Tell us what grinds your gears...</h4>
          </div>
          <div id="mainContent">
            <h4 id="wordList">Word List</h4>
            <div className="row fullRow" id="listInputs">
              <input type="text" id="wordInput" className="col-sm-12 col-md-6 pull-left" placeholder='Add Word and Press Enter' onKeyPress={this.addWord.bind(this)} />
              <input id="search" type="text" className="col-sm-12 col-md-6 pull-right" placeholder="Search" valueLink={linkState(this, 'inputVal')} />
            </div>
            <div id="list">{autocomplete}</div>
          </div>
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