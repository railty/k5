import React, { PropTypes } from 'react'
import Slot from './slot'

class Piano extends React.Component {
    render () {
      var blacks=[], whites=[];
      var i=0;
      for(var item of this.props.data){
        if (item.note.length==2){
          whites.push((
            <Slot key={++i} data={item} />
          ));
        }
        else{
          blacks.push((
            <Slot key={++i} data={item} />
          ));
        }
      }
      var transform="translate(0, -200px)";
      if (this.props.data[0].note.length==3) transform="translate(-20px, -200px)";

      return (
          <div className="piano">
            <div className="whites">{whites}</div>
            <div className="blacks" style={{ transform: transform }}>{blacks}</div>
          </div>
      )
    }
}

export default Piano
