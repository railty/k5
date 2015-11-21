import React from 'react';

export default class Time extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="seconds">
        {this.props.seconds}
      </div>
    );
  }
}
