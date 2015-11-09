import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Swipe from 'swipe-js-iso';

import Piano from './piano';

class PianoView extends React.Component {
    constructor(props) {
       super(props);
       var total = this.props.data.length;
       this.state = {pos: Math.floor(total/2)};
    }

    createSwiper(){
      var bottom = ReactDOM.findDOMNode(this);
      var swipe = bottom.getElementsByClassName("swipe")[0];
      if (swipe){
        var total = this.props.data.length;
        this.swipe = Swipe(swipe, {
          continuous: false,
          startSlide: this.state.pos,
          callback: (index, elem) => {
            this.setState({pos: index});
          }
        });
      }
    }

    deleteSwiper(){
      if (this.swipe){
        this.swipe.kill();
        delete this.swipe;
      }
    }

    componentDidMount() {
      console.log("mount");
      this.createSwiper();
    }

    componentWillUnmount() {
      console.log("unmount");
      this.deleteSwiper();
    }

    next(){
        this.swipe.next();
    }

    prev(){
        this.swipe.prev();
    }

    render () {
      console.log("rendor");
      var total = this.props.data.length;
      var wLeft = Math.round(100*this.state.pos/total) + "%";
      var wMiddle = Math.round(100*1/total) + "%";

      if (this.props.data.length==1) {
        return(
          <div className="bottom-container">
            <div className="bottom">
               <Piano data={this.props.data[0]} />
            </div>
          </div>
        )
      }else{
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
}

export default PianoView
