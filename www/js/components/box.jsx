import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { playTone } from './mp3';
import DataActions from './dataActions';
import DataStore from './dataStore';

const boxSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    const box = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log("drop to " + dropResult.name);
      if (dropResult.name == 'floor') DataActions.dropFloor({box: box.data, dest: dropResult.dest});
      if (dropResult.name == 'slot') DataActions.dropSlot({box: box.data, slot:dropResult.slot});
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Box extends React.Component {
    componentDidMount() {
      this.props.connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      });
    }

    onClick(){
      var data = this.props.data;
      var mp3 = data.note + ".mp3";
      playTone(mp3);
    }

    render () {
      const { isDragging, connectDragSource, data: {l, t, note, octave, color}, slotNote, preview } = this.props;
      var style = {};
      const opacity = isDragging ? 0.5 : 1;
      const options = DataStore.getOptions();

      if (preview){
        style.left = l;
        style.top = t;
        return (
          <div className="box" style={{ ...style, opacity }} />
        );
      }else{
        //box is in piano
        if (slotNote) {
          style.background = "lightgreen";
          if ((options.bPianoBoxColorHint) && (slotNote == note)) style.background = "darkgreen";

          return (
            connectDragSource(
              <div className="box" style={{ ...style }} onClick={this.onClick.bind(this)} />
            )
          );
        }
        else{
          //box is in floor
          style.left = l;
          style.top = t;

          var contentDiv;
          if (options.bShowNoteInFloorBox) contentDiv = (<div >{note}</div>);
          else contentDiv = (<div className="glyphicon glyphicon-music"></div>);

          return (
            connectDragSource(
              <div className="box" style={{ ...style, opacity }} onClick={this.onClick.bind(this)} >
                {contentDiv}
              </div>
            )
          );
        }
      }
    }
}


export default DragSource("box", boxSource, collect)(Box);
