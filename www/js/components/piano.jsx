import '../../css/piano.css'

import React, { PropTypes } from 'react'
import Slot from './slot'

class Piano extends React.Component {
    render () {

      const slots = this.props.data.map(function(slot, i){
        return (
          <Slot key={i} data={slot} />
        );
      });

      return (
          <div className="piano">{slots}
          </div>
      )
    }
}

export default Piano
