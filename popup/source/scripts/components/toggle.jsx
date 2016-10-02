import React from 'react';
// import {render} from 'react-dom';
import Switch from 'react-toggle-switch';

class ToggleSwitch extends React.Component {
  render() {
    return (
      <div>
        <Switch onClick={console.log('clicked')} />
      </div>
    )
  }
}

export default ToggleSwitch;
