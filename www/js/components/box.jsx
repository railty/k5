import '../../css/box.css'

import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dropFloor, dropSlot, msg, getAudioCtx } from './data';

const boxSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    const box = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      if (dropResult.name == 'floor') dropFloor(box.data, dropResult.dest);
      if (dropResult.name == 'slot') dropSlot(box.data, dropResult.slot);
    }
  }
};

function collect(connect, monitor) {

  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Box extends React.Component {
    componentDidMount() {
      this.props.connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      });
    }
    onClick(){
      var data = this.props.data;
      var mp3 = data.color == "white" ? data.note+data.octave+".mp3" : data.note+'b'+data.octave+".mp3";

      var concertHallBuffer, soundSource;
      var audioCtx = getAudioCtx();

      var ajaxRequest = new XMLHttpRequest();

      var url;
      if (cordova.platformId == "browser"){
        url = cordova.file.applicationDirectory + "browser/" + "www/media/" + mp3;
      }
      else{
        url = cordova.file.applicationDirectory + "www/media/" + mp3;
      }

      ajaxRequest.open('GET', url, true);
      ajaxRequest.responseType = 'arraybuffer';

      ajaxRequest.onload = function() {
        var audioData = ajaxRequest.response;
        audioCtx.decodeAudioData(audioData, function(buffer) {
            concertHallBuffer = buffer;
            soundSource = audioCtx.createBufferSource();
            soundSource.buffer = concertHallBuffer;

            soundSource.connect(audioCtx.destination);
            soundSource.start();
          }, function(e){"Error with decoding audio data" + e.err}
        );
      }

      ajaxRequest.send();
    }

    render () {
      const { isDragging, connectDragSource, data: {l, t, note, octave, color}, slot, preview } = this.props;
      const style = {
        cursor: 'move',
        background: color=="white" ? "azure" : "black",
        color: color=="white" ? "black" : "azure",
        left: l,
        top: t,
      };
      const opacity = isDragging ? 0.4 : 1;
      msg(isDragging);

      if (preview){
        return (
          <div className="box" style={{ ...style, opacity }}>
            {note+octave}
          </div>
        );
      }else{
        if (!slot) style.position = 'absolute';
        return (
          connectDragSource(
            <div className="box" style={{ ...style, opacity }} onClick={this.onClick.bind(this)}>
              {note+octave}
            </div>
          )
        );
      }
    }
}


export default DragSource("box", boxSource, collect)(Box);
