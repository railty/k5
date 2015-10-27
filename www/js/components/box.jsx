import '../../css/box.css'

import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dropFloor, dropSlot, msg } from './data';
import { playTone } from './mp3';

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
      var mp3 = data.note + data.octave + ".mp3";
      playTone(mp3);
    }

    render () {
      const { isDragging, connectDragSource, data: {l, t, note, octave, color}, slot, preview } = this.props;
      const style = {
        cursor: 'move',
        background: "darkgreen",
        color: "black",
        left: l,
        top: t,
      };
      const opacity = isDragging ? 0.4 : 1;
      msg(isDragging);

      if (preview){
        return (
          <div className="box" style={{ ...style, opacity }}>
            *
          </div>
        );
      }else{
        if (!slot) style.position = 'absolute';
        return (
          connectDragSource(
            <div className="box" style={{ ...style, opacity }} onClick={this.onClick.bind(this)}>
              *
            </div>
          )
        );
      }
    }
}


export default DragSource("box", boxSource, collect)(Box);
