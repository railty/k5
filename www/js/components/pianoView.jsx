import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Swipe from 'swipe-js-iso';

import Piano from './piano';

class PianoView extends React.Component {
    constructor(props) {
       super(props);
    }

    componentDidMount() {
      this.swipe = Swipe(ReactDOM.findDOMNode(this), {});
    }
    test(){
        this.swipe.next();
    }
    render () {
      return (
        <div id='slider' className='swipe'>
          <div className='swipe-wrap' onClick={this.test.bind(this)}>
            <div><Piano data={this.props.data.slice(0, 10)} /></div>
            <div><Piano data={this.props.data.slice(10, 20)} /></div>
            <div><Piano data={this.props.data.slice(20, 30)} /></div>
          </div>
        </div>
      )
    }
}

export default PianoView
