import '../../css/app.css'

import React, { PropTypes } from 'react'
import { DragDropContext } from 'react-dnd';

import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { default as TouchBackend } from 'react-dnd-touch-backend';

var backEnd = (cordova.platformId == "browser") ? HTML5Backend : TouchBackend;

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
    onClick(){
      debugger;
      window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/media/220-A.mp3", function(fileEntry){
        fileEntry.file(function(file) {
          var reader = new FileReader();

          reader.onloadend = function(e) {
          console.log("Text is: "+this.result);
          document.querySelector("#textArea").innerHTML = this.result;
          }

          reader.readAsText(file);
          });
      }, function(){
        console.log('failed');
      });

    }
    render () {
        var msg = bSuccess() ? 'Success' : 'Running ' + cordova.file.applicationDirectory;
        return (
            <div className="app">
              <div className="top" onClick={this.onClick}>{msg}</div>
              <Floor data={this.state.data.floor} />
              <Piano data={this.state.data.piano} />
            </div>
        )
    }
}

//export default DragDropContext(HTML5Backend)(App);
//export default DragDropContext(TouchBackend)(App);
export default DragDropContext(backEnd)(App);
