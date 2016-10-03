import React, {Component} from 'react';
import {connect} from 'react-redux';

import Switch from 'react-toggle-switch';

function toggleFilter() {
  return ({
    type: 'TOGGLE_FILTER'
  })
}

class App extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    document.addEventListener('click', () => {
      this.props.dispatch(toggleFilter());
   });
  }

  render() {
    let filter_status = (this.props.filter_on) ? 'enabled' : 'disabled';
    return (
      <div>
        <h1>Stop Harassment</h1>
        <h5>'Kind words can be short and easy to speak but their echoes are truly endless.' --Mother Theresa</h5>
        <div>
          <h3>Word Filtering</h3>
          <Switch on={this.props.filter_on}/>
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

// const mapDispatchtoProps = dispatch => ({
//   toggleFilter: () => dispatch({type: 'TOGGLE'})
// })

export default connect(
  mapStateToProps
  )(App);
