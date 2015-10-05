import '../../css/piano.css'

import React, { PropTypes } from 'react'
import Slot from './slot'

const style = {
};

class Piano extends React.Component {
    render () {

      const slots = this.props.data.map(function(item, i){
        return (
          <Slot key={i} data={item} />
        );
      });

      return (
          <div className="piano" style={{ ...style }}>{slots}
          </div>
      )
    }
}

export default Piano
