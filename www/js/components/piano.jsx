import React, { PropTypes } from 'react';
import UAParser from 'ua-parser-js';
import Slot from './slot';

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

      //200px is the white height
      var transform="translate(0, -200px)";
      var parser = new UAParser();
      //render engine is different
      //for webkit, a div with position absoulte inside a flex box shows ourside the flexbow, so need transform
      //for edge, it shows inside the flexbox.
      if (parser.getResult().engine.name=="EdgeHTML"){
        transform="translate(0px, 0px)";
      }
      return (
          <div className="piano">
            <div className="whites">{whites}</div>
            <div className="blacks" style={{ transform: transform }}>{blacks}</div>
          </div>
      )
    }
}

export default Piano;
