import React, { PropTypes } from 'react';
import Slot from './slot';

class Piano extends React.Component {
    render () {
      var blacks=[], whites=[];
      var i=0;
      var slots = this.props.data.map((key)=>{
        return (
          <Slot key={++i} data={key}/>
        )
      });
      return (
        <div className='piano'>
          {slots}
        </div>
      )
    }
}

export default Piano;
