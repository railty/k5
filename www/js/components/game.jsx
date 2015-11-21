import React, { PropTypes } from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

var backEnd = (cordova.platformId == "browser" || cordova.platformId == "windows") ? HTML5Backend : TouchBackend;

import Floor from './floor'
import PianoView from './pianoView'
import CustomDragLayer from './customDragLayer';
import DataStore from './dataStore';

class Game extends React.Component {
    constructor(props) {
       super(props);
    }

    render () {
        const style = {
          height: window.innerHeight,
        };

        if (DataStore.bSuccess()) return (
            <div className="text-screen">
              Success!
              Good Job!
            </div>
        )
        else return (
            <div className="game" style={{ ...style }}>
              <Floor data={this.props.floor} />
              <PianoView data={this.props.piano} />
              <CustomDragLayer />
            </div>
        )
    }
}

export default DragDropContext(backEnd)(Game);
