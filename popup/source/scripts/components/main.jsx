import React, {Component} from 'react';
import {connect} from 'react-redux';

import Switch from 'react-toggle-switch';

class App extends Component{
  constructor(props){
    super(props);
  }

  render() {
    let filter_status = (this.props.filter_on) ? 'enabled' : 'disabled';
    let filter_options = (this.props.filter_on) ?
      <div>
        <form>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="hide_tweets" />
              Hide Tweets
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="word_substitutes" />
              Word Substitutes
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="filter_options" value="option3" />
              Other Cool Option
            </label>
          </div>
        </form>
        <button>Word Settings</button>
      </div> :
      <div></div>;
    return (
      <div>
        <h1>Stop Harassment</h1>
        <h5>'Kind words can be short and easy to speak but their echoes are truly endless.' --Mother Theresa</h5>
        <div>
          <h3>Word Filtering</h3>
          <Switch onClick={this.props.toggleFilter} on={this.props.filter_on}/>
        </div>
        <p>Application is {filter_status}</p>
        {filter_options}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter_on: state.filter_on
  };
};

const mapDispatchtoProps = dispatch => ({
  toggleFilter: () => dispatch({type: 'TOGGLE_FILTER'})
})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
  )(App);
