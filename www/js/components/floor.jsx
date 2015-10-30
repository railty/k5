import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd';

import Box from './box'

const floorTarget = {
  drop(props, monitor, component) {
    return {name: 'floor', dest: monitor.getSourceClientOffset()};
  }
};

function collect(connect, monitor) {

  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Floor extends React.Component {
    render () {
      const { connectDropTarget } = this.props;

      const boxes = this.props.data.map(function(box, i){
        return (
          <Box key={i} data={box} />
        );
      });

      return connectDropTarget(
        <div className="floor">
          {boxes}
        </div>
      );
    }
}

export default DropTarget("box", floorTarget, collect)(Floor);
