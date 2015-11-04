import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Swipe from 'swipe-js-iso';

import Piano from './piano';

class PianoView extends React.Component {
    constructor(props) {
       super(props);
       this.state = {page: 1};
    }

    componentDidMount() {
      var bottom = ReactDOM.findDOMNode(this);
      var swipe = bottom.getElementsByClassName("swipe")[0];
      this.swipe = Swipe(swipe, { continuous: false });
    }

    next(){
        this.swipe.next();
        this.setState({page: this.swipe.getPos()});
    }

    prev(){
        this.swipe.prev();
        this.setState({page: this.swipe.getPos()});
    }

    render () {
      var totalPage = 3;
      var wLeft = Math.round(100*this.state.page/totalPage) + "%";
      var wMiddle = Math.round(100*1/totalPage) + "%";

      return (
        <div className="bottom-container">
          <div className="indicator">
            <div className="indicator-left" style={{width: wLeft}}></div>
            <div className="indicator-middle" style={{width: wMiddle}}></div>
            <div className="indicator-right"></div>
          </div>
          <div className="bottom">
            <div className="prev glyphicon glyphicon-chevron-left" onClick={this.prev.bind(this)}></div>
            <div id='slider' className='swipe'>
              <div className='swipe-wrap'>
                <div><Piano data={this.props.data.slice(0, 40)} /></div>
                <div><Piano data={this.props.data.slice(40, 80)} /></div>
                <div><Piano data={this.props.data.slice(80, 120)} /></div>
              </div>
            </div>
            <div className="next glyphicon glyphicon-chevron-right" onClick={this.next.bind(this)}></div>
          </div>
        </div>
      )
    }
}

export default PianoView
