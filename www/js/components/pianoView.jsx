import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Swipe from 'swipe-js-iso';

import Piano from './piano';

class PianoView extends React.Component {
    constructor(props) {
       super(props);
       this.state = {page: 1};
    }

    createSwiper(){
      var bottom = ReactDOM.findDOMNode(this);
      var swipe = bottom.getElementsByClassName("swipe")[0];
      var total = this.props.data.length;
      this.swipe = Swipe(swipe, {continuous: false, startSlide: Math.floor(total/2)});
    }

    deleteSwiper(){
      this.swipe.kill();
      delete this.swipe;
    }

    componentDidMount() {
      console.log("mount");
      this.createSwiper();
    }

    componentWillUpdate(nextProps, nextState){
      if (this.props.data.length!=nextProps.data.length){
        this.deleteSwiper();
      }
    }

    componentDidUpdate(prevProps, prevState){
      if (this.props.data.length!=prevProps.data.length){
        this.createSwiper();
      }
    }

    componentWillUnmount() {
      console.log("unmount");
      this.deleteSwiper();
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
      console.log("rendor");
      var total = this.props.data.length;
      var wLeft = Math.round(100*this.state.page/total) + "%";
      var wMiddle = Math.round(100*1/total) + "%";

      var slideViews = this.props.data.map((section, i)=>{
         return(
           <div key={i}>
             <Piano data={section} />
           </div>
         );
      });

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
                {slideViews}
              </div>
            </div>
            <div className="next glyphicon glyphicon-chevron-right" onClick={this.next.bind(this)}></div>
          </div>
        </div>
      )
    }
}

export default PianoView
