import React, { PropTypes } from 'react'
import DataStore from './dataStore';

class Indicator extends React.Component {
  constructor(props) {
     super(props);
     this.state = DataStore.getState();
  }

  componentDidMount() {
    DataStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    DataStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render () {
    var viewLeft = 0, viewWidth = 1;

    if (this.state.indicator){
      console.log("render indicator");
      viewLeft = this.state.indicator.viewLeft;
      viewWidth = this.state.indicator.viewWidth;
    }
    else{
      console.log("render default indicator");
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
