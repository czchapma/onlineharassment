import React, {Component} from 'react';
import {connect} from 'react-redux';

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
    let filter_status = (this.props.filter_on) ? 'on' : 'off';
    return (
      <div>
        <h1>Stop Harassment</h1>
        <p>Filter is {filter_status}</p>
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
