import React, { PropTypes } from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

var backEnd = (cordova.platformId == "browser") ? HTML5Backend : TouchBackend;

import Floor from './floor'
import PianoView from './pianoView'
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
          //default bootstrap nav height is 50px
          height: window.innerHeight-50,
        };

        return (
            <div className="game" style={{ ...style }}>
              <Floor data={this.state.data.floor} />
              <PianoView data={this.state.data.piano} />
              <CustomDragLayer />
            </div>
        )
    }

}

export default DragDropContext(backEnd)(Game);
