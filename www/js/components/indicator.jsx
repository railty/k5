import React, { PropTypes } from 'react'
import DataStore from './dataStore';

class Indicator extends React.Component {
  constructor(props) {
     super(props);
  }

  render () {
    var {viewLeft, viewWidth} = DataStore.getIndicator();

    var wLeft = Math.round(100*viewLeft) + "%";
    var wMiddle = Math.round(100*viewWidth) + "%";

    return (
      <div className="indicator">
        <div className="indicator-left" style={{width: wLeft}}></div>
        <div className="indicator-middle" style={{width: wMiddle}}></div>
        <div className="indicator-right"></div>
      </div>
    );
  }
}

export default Indicator;
