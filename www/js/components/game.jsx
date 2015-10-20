import '../../css/game.css'

import React, { PropTypes } from 'react'
import { DragDropContext } from 'react-dnd';

import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';

var backEnd = (cordova.platformId == "browser") ? HTML5Backend : TouchBackend;

import Floor from './floor'
import Piano from './piano'
import CustomDragLayer from './customDragLayer';
import { observe, bSuccess } from './data';

class Game extends React.Component {
    constructor(props) {
       super(props);
       this.unobserve = observe(this.handleChange.bind(this));
    }

    handleChange(data) {
       const nextState = { data };
       if (this.state) {
         this.setState(nextState);
       } else {
         this.state = nextState;
       }
    }
    componentWillUnmount() {
      this.unobserve();
    }
    onClick(){
      console.log('aaa');
    }
    render () {
        var msg = bSuccess() ? 'Success' : 'Running';
        const style = {
          height: window.innerHeight-100,
        };

        return (
            <div className="game" style={{ ...style }}>
              <div className="top" onClick={this.onClick}>{msg + ':' + this.state.data.msg}</div>
              <Floor data={this.state.data.floor} />
              <Piano data={this.state.data.piano} />
              <CustomDragLayer />
            </div>
        )
    }
}

//export default DragDropContext(HTML5Backend)(App);
//export default DragDropContext(TouchBackend)(App);
export default DragDropContext(backEnd)(Game);
