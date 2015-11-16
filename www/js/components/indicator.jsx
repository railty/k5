import React, { PropTypes } from 'react'
import DataStore from './dataStore';

class Indicator extends React.Component {
  constructor(props) {
     super(props);
     this.state = DataStore.getState();
  }

  componentDidMount() {
    this.unlisten = DataStore.listen(this.onChange.bind(this));
  }

  //unlisten will remove the function from an array of functions using ===
  //if you bind(this), it will lanuchn a new instance and it will never be same
  componentWillUnmount() {
    this.unlisten();
  }

  onChange(state) {
    this.setState(state);
  }

  render () {
    var viewLeft = 0, viewWidth = 1;

    if (this.state.indicator){
      //console.log("render indicator");
      viewLeft = this.state.indicator.viewLeft;
      viewWidth = this.state.indicator.viewWidth;
    }
    else{
      //console.log("render default indicator");
    }

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
