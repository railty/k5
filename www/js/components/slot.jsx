import '../../css/slot.css'

import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd';

const style = {
};

const slotTarget = {
  drop(props, monitor, component) {
    return {name: 'slot'};
  },
  hover(props, monitor, component) {
    console.log("1111");
  }
};

function collect(connect, monitor) {
  console.log(monitor.isOver({ shallow: true }));
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
      const { canDrop, isOver, data: {color, k, note, box} } = this.props;
      const isActive = canDrop && isOver;

//console.log(canDrop +","+ isOver);

      let backgroundColor = 'darkgreen';
      if (isActive) {
        backgroundColor = 'darkgrey';
      }
      return (
          <div className="slot" style={{ ...style, backgroundColor }}>
            {note}
          </div>
      );
    }
}

export default DropTarget("box", slotTarget, collect)(Slot);
