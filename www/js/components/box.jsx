import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { dropFloor, dropSlot, msg } from './data';
import { playTone } from './mp3';
import DataActions from './dataActions';

const boxSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    const box = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log("drop to " + dropResult.name);
      if (dropResult.name == 'floor') DataActions.dropFloor({box: box.data, dest: dropResult.dest});
      if (dropResult.name == 'slot') DataActions.dropSlot({box: box.data, slot:dropResult.slot});
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
        left: l,
        top: t,
      };
      const opacity = isDragging ? 0.5 : 1;

      if (preview){
        return (
          <div className="box" style={{ ...style, opacity }} />
        );
      }else{
        if (slot) {
          style.width = "100%";
        }
        else{
          style.position = 'absolute';
        }
        return (
          connectDragSource(
            <div className="box" style={{ ...style, opacity }} onClick={this.onClick.bind(this)} />
          )
        );
      }
    }
}


export default DragSource("box", boxSource, collect)(Box);
