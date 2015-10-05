import '../../css/slot.css'

import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd';

import Box from './box'

const style = {
};

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

    static propTypes = {
      isOver: PropTypes.bool.isRequired,
    };

    render () {
      const { connectDropTarget, canDrop, isOver, data: {color, k, note, box} } = this.props;
      const isActive = canDrop && isOver;

      let backgroundColor = 'darkgreen';
      if (isActive) {
        backgroundColor = 'darkgrey';
      }

      if (box){
        return connectDropTarget(
            <div className="slot" style={{ ...style, backgroundColor }}>
              <Box data={box} slot />
              {note}
            </div>
        );
      }else{
        return connectDropTarget(
            <div className="slot" style={{ ...style, backgroundColor }}>
              {note}
            </div>
        );
      }
    }
}

export default DropTarget("box", slotTarget, collect)(Slot);
