import React, { PropTypes } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import Floor from './floor'
import Piano from './piano'
import { observe } from './data';

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
        var title = {
          color: 'red',
        };
        var content = {
          color: 'blue',
        };

        return (
            <div>
                <Floor data={this.state.data.floor} />
                <Piano data={this.state.data.piano} />
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);
