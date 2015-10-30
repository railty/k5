import React, { PropTypes } from 'react'
import Slot from './slot'

class Piano extends React.Component {
    render () {
      var blacks=[], whites=[];
      for(var item of this.props.data){
        if (item.note.length==1){
          whites.push((
            <Slot key={item.k} data={item} />
          ));
        }
        else{
          blacks.push((
            <Slot key={item.k} data={item} />
          ));
        }
      }
      return (
          <div className="piano">
            <div className="whites">{whites}</div>
            <div className="blacks">{blacks}</div>
          </div>
      )
    }
}

export default Piano
