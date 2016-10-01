import React, {Component} from 'react';
import {connect} from 'react-redux';


class App extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('component mounted');
    document.addEventListener('click', () => {
      console.log('before', this.props.filter_on);
      console.log(this.props);
      this.props.dispatch({
        type: 'TOGGLE'
      });
      console.log('after', this.props.filter_on);
   });
  }

  render() {
    return (
      <div>
        <h1>Stop Harassment</h1>
        <p>Filter is {this.props.filter_on}</p>
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
