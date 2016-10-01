import React, {Component} from 'react';
import {connect} from 'react-redux';


class App extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('component mounted');
    document.addEventListener('click', () => {
      console.log('adding listener');
     this.props.dispatch({
       type: 'TOGGLE'
     });
   });
  }

  render() {
    return (
      <div>
        <h1>Stop Harassment</h1>
        <p>Filter is {this.props.filter_status}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    filter_status: state.filter_status
})

export default connect(mapStateToProps)(App);
