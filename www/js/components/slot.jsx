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
    const { connectDropTarget, canDrop, isOver, data: {k, note, box, octave} } = this.props;
    const isActive = canDrop && isOver;

    var className = note.length==1 ? 'white' : 'black';

    let backgroundColor;
    if (isActive) {
      backgroundColor = 'lightgreen';
    }
    else{
      backgroundColor = className=='white' ? 'lightgrey' : 'black';
    }

    let c = note=='C' ? 'C' : "";

    if (box){
      return connectDropTarget(
        <div className={className} style={{ backgroundColor }}>
          <Box data={box} slot={className} />
        </div>
      );
    }else{
      return connectDropTarget(
        <div className={className} style={{ backgroundColor }}>
          {c}
        </div>
      );
    }
  }
}

export default DropTarget("box", slotTarget, collect)(Slot);
