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

    var className = note.length==2 ? 'white' : 'black';
    let backgroundColor;
    if (isActive) {
      backgroundColor = 'lightgreen';
    }
    else{
      backgroundColor = className=='white' ? 'lightgrey' : 'black';
    }
    let disable = (note.substr(0,2)=='Fb')||(note.substr(0,2)=='Cb');
    let opacity = 1;
    if (disable) {
      backgroundColor = 'lightgrey';
      opacity = 0;
    }
    var text = className=="white" ? note : '';
    if (box){
      return connectDropTarget(
        <div className={className} style={{ backgroundColor, opacity }}>
          <Box data={box} slot={className} />
        </div>
      );
    }else{
      return connectDropTarget(
        <div className={className} style={{ backgroundColor, opacity }}>
          {text}
        </div>
      );
    }
  }
}

export default DropTarget("box", slotTarget, collect)(Slot);
