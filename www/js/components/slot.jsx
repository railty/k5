import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd';

import Box from './box'

const slotTarget = {
  drop(props, monitor, component) {
    return {name: 'slot', slot: props.data};
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Slot extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { connectDropTarget, canDrop, isOver, data: {note, box} } = this.props;
    const isActive = canDrop && isOver;

    var style = {};
    if (isActive) style.backgroundColor = 'lightgreen';

    var className = note.length==2 ? 'white' : 'black';
    var labelDiv = className == 'white' ? (<div className='note'>{note}</div>) : null;
    var boxDiv = box ? (<Box data={box} slotNote={note} />) : null;

    return connectDropTarget(
      <div className={className} style={style}>
        {labelDiv}
        {boxDiv}
      </div>
    );
  }
}


export default DropTarget("box", slotTarget, collect)(Slot);
