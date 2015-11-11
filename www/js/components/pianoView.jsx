import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';

import Swipe from './swipe';
import Piano from './piano';

class PianoView extends React.Component {
    constructor(props) {
       super(props);
       var total = this.props.data.length;
       this.state = {pos: Math.floor(total/2)};
    }

    componentDidMount() {
      console.log("mount");
      this.viewLeft = 0;
      var bottom = ReactDOM.findDOMNode(this);
      var pianoView = bottom.getElementsByClassName("piano-view")[0];
      this.swipe = new Swipe(pianoView, (swipeDir)=>{
        if (swipeDir=="left") this.prev();
        if (swipeDir=="right") this.next();
      });
    }

    componentWillUnmount() {
      console.log("unmount");
      this.swipe.delete();
    }

    slide(){
      var bottom = ReactDOM.findDOMNode(this);
      var piano = bottom.getElementsByClassName("piano")[0];
      if (piano){
        piano.style.transform = `translate(${this.viewLeft}px, 0px)`;
      }
    }
    next(){
      this.viewLeft += 200;
      //if (this.viewLeft > window.innerWidth - 600) this.viewLeft = window.innerWidth - 600;
      this.slide();
    }
    prev(){
      this.viewLeft -= 200;
      //if (this.viewLeft < 0) this.viewLeft = 0;
      this.slide();
    }

    render () {
      console.log("rendor");
      var total = this.props.data.length;
      var wLeft = Math.round(100*this.state.pos/total) + "%";
      var wMiddle = Math.round(100*1/total) + "%";

      return (
        <div className="bottom-container">
          <div className="indicator">
            <div className="indicator-left" style={{width: wLeft}}></div>
            <div className="indicator-middle" style={{width: wMiddle}}></div>
            <div className="indicator-right"></div>
          </div>
          <div className="bottom">
            <div className="prev glyphicon glyphicon-chevron-left" onClick={this.prev.bind(this)}></div>
            <div className='piano-view'>
                 <Piano data={this.props.data} />
            </div>
            <div className="next glyphicon glyphicon-chevron-right" onClick={this.next.bind(this)}></div>
          </div>
        </div>
      )
    }
}

export default PianoView
