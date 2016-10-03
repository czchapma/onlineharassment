import React, {Component} from 'react';
import {connect} from 'react-redux';

import Switch from 'react-toggle-switch';

class App extends Component{
  constructor(props){
    super(props);
  }

  render() {
    let filter_status = (this.props.filter_on) ? 'enabled' : 'disabled';
    return (
      <div>
        <h1>Stop Harassment</h1>
        <h5>'Kind words can be short and easy to speak but their echoes are truly endless.' --Mother Theresa</h5>
        <div>
          <h3>Word Filtering</h3>
          <Switch onClick={this.props.toggleFilter} on={this.props.filter_on}/>
        </div>
        <p>Application is {filter_status}</p>
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
