import React, {Component} from 'react';
import {connect} from 'react-redux';

import Switch from 'react-toggle-switch';
import FilterOptions from './filterOptions'

class App extends Component{
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props.filter_options);
    let filter_status = (this.props.filter_on) ? 'enabled' : 'disabled';
    let filter_options = (this.props.filter_on) ? <FilterOptions checkFilterOption={this.props.checkFilterOption} filter_options={this.props.filter_options}/> : <div></div>;
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
