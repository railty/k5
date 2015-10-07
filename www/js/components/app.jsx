import React, { PropTypes } from 'react'
import { DragDropContext } from 'react-dnd';
//import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { default as TouchBackend } from 'react-dnd-touch-backend';

import Floor from './floor'
import Piano from './piano'
import { observe, bSuccess } from './data';

class App extends React.Component {

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

    render () {
        const style = {
          position:'absolute',
          top:300,
          left:0,
          width:'100%',
          height:150,
        };

        if (bSuccess()) return (
          <div>Success</div>
        )
        else return (
            <div>
                <Floor data={this.state.data.floor} />
                <Piano data={this.state.data.piano} />
                <div style={{ ...style }}>1111</div>
            </div>
        )
    }
}

//export default DragDropContext(HTML5Backend)(App);
export default DragDropContext(TouchBackend)(App);
