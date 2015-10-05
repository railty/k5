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
          <div className="box" style={{ ...style, opacity }}>
            {note}
          </div>
        )
      );
    }
}


export default DragSource("box", boxSource, collect)(Box);
