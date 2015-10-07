import '../../css/box.css'

import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd';

import { dropFloor, dropSlot } from './data';

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
    isDragging: monitor.isDragging()
  };
}

class Box extends React.Component {
    onClick(){
      debugger;
      var concertHallBuffer, soundSource;
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      var ajaxRequest = new XMLHttpRequest();

      var url0 = '/browser/www/media/220-A.mp3';
      var url1 = 'https://drive.google.com/file/d/0B1dzL4WNzGjhSnREUlZsZWVQSWc/view?usp=sharing';
      var url2 = 'https://drive.google.com/file/d/0B1dzL4WNzGjhTkJRTWxRd2NDd3M/view?usp=sharing';
      var url3 = 'https://drive.google.com/file/d/0B1dzL4WNzGjhVFZMNEhMQy00blU/view?usp=sharing';

      ajaxRequest.open('GET', url0, true);      
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
      const { isDragging, connectDragSource, data: {l, t, note}, slot } = this.props;
      const opacity = isDragging ? 0.4 : 1;

      const style = {
        cursor: 'move',
        left: l,
        top: t,
      };

      if (!slot) style.position = 'absolute';
      return (
        connectDragSource(
          <div className="box" style={{ ...style, opacity }} onClick={this.onClick}>
            {note}
          </div>
        )
      );
    }
}


export default DragSource("box", boxSource, collect)(Box);
