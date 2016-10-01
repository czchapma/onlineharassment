import React, {Component} from 'react';
import {connect} from 'react-redux';


class App extends Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Stop Harassment</h1>
        <p>{this.props.filter_status}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    filter_status: state.filter_status
})

export default connect(mapStateToProps)(App);
