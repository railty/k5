import '../../css/box.css'

import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd';

import { dropBox } from './data';

const boxSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    const box = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      dropBox(box.data, dropResult.name, dropResult.dlt);
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
      const { isDragging, connectDragSource, data: {l, t, note} } = this.props;
      const opacity = isDragging ? 0.4 : 1;

      const style = {
        cursor: 'move',
        left: l,
        top: t,
      };

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
