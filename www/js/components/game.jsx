import React, { PropTypes } from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

var backEnd = (cordova.platformId == "browser" || cordova.platformId == "windows") ? HTML5Backend : TouchBackend;

import Floor from './floor'
import PianoView from './pianoView'
import CustomDragLayer from './customDragLayer';
import DataStore from './dataStore';
import DataActions from './dataActions';

class Game extends React.Component {
    constructor(props) {
       super(props);
       this.state = DataStore.getState();
    }

    componentDidMount() {
      this.unlisten = DataStore.listen(this.onChange.bind(this));
    }

    componentWillUnmount() {
      this.unlisten();
    }

    onChange(state) {
      this.setState(state);
    }

    render () {
        var msg = DataStore.bSuccess() ? 'Success' : 'Running';
        const style = {
          //default bootstrap nav height is 50px
          height: window.innerHeight-50,
        };

        if (DataStore.bSuccess()) return (
            <div className="text-screen">
              Success!
            </div>
        )
        else if (this.state.restarting) return (
            <div className="text-screen">
              Reloading
            </div>
        )
        else return (
            <div className="game" style={{ ...style }}>
              <Floor data={this.state.floor} />
              <PianoView data={this.state.piano} />
              <CustomDragLayer />
            </div>
        )
    }
}

export default DragDropContext(backEnd)(Game);
