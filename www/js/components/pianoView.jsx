import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';

import Swipe from './swipe';
import Piano from './piano';
import Indicator from './indicator';
import DataActions from './dataActions';
import DataStore from './dataStore';


class PianoView extends React.Component {
    constructor(props) {
       super(props);
    }

    calculateIndicator() {
      this.viewLeft = 0;
      var bottom = ReactDOM.findDOMNode(this);
      var pianoView = bottom.getElementsByClassName("piano-view")[0];
      var piano = bottom.getElementsByClassName("piano")[0];
      if (this.swipe) this.swipe.delete();
      this.swipe = new Swipe(pianoView, (swipeDir)=>{
        if (swipeDir=="left") this.next();
        if (swipeDir=="right") this.prev();
      });

      return {viewLeft: this.viewLeft/piano.scrollWidth, viewWidth: pianoView.clientWidth/piano.scrollWidth};
    }

    componentDidMount() {
      var nextIndicator = this.calculateIndicator();
      setTimeout(()=>{
        DataActions.setIndicator(nextIndicator);
      }, 0);
    }

    componentDidUpdate(prevProps, prevState){
      //keyboard changed
      if (prevProps.data.length != this.props.data.length){
        var nextIndicator = this.calculateIndicator();
        this.slide();
        console.log(nextIndicator);
        var lastIndicator = DataStore.getIndicator();
        if ((lastIndicator.viewLeft != nextIndicator.viewLeft) || (lastIndicator.viewWidth != nextIndicator.viewWidth)){
          setTimeout(()=>{
            DataActions.setIndicator(nextIndicator);
          }, 0);
        }
      }
    }

    componentWillUnmount() {
      this.swipe.delete();
    }

    slide(){
      var bottom = ReactDOM.findDOMNode(this);
      var pianoView = bottom.getElementsByClassName("piano-view")[0];
      var piano = bottom.getElementsByClassName("piano")[0];

      if (this.viewLeft < 0) this.viewLeft = 0;
      if (this.viewLeft > piano.scrollWidth - pianoView.clientWidth) this.viewLeft = piano.scrollWidth - pianoView.clientWidth;

      DataActions.setIndicator({viewLeft: this.viewLeft/piano.scrollWidth, viewWidth: pianoView.clientWidth/piano.scrollWidth});
      if (piano){
        piano.style.transform = `translate(${-this.viewLeft}px, 0px)`;
      }
    }
    next(){
      this.viewLeft += 200;
      this.slide();
    }
    prev(){
      this.viewLeft -= 200;
      this.slide();
    }

    render () {
      return (
        <div className="bottom-container">
          <Indicator />
          <div className="bottom">
            <div className="prev glyphicon glyphicon-chevron-left" onClick={this.prev.bind(this)}></div>
            <div className='piano-view'>
                 <Piano data={this.props.data} />
            </div>
            <div className="next glyphicon glyphicon-chevron-right" onClick={this.next.bind(this)}></div>
          </div>
        </div>
      );
    }
}

export default PianoView
