import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { playTone } from './mp3';
import DataActions from './dataActions';

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
      var cheat = 2;

      if (preview){
        return (
          <div className="box" style={{ ...style, opacity }} />
        );
      }else{
        if (slotNote) {
          if (slotNote == note) style.background = "lightgreen";
          else style.background = "darkgreen";
          return (
            connectDragSource(
              <div className="box" style={{ ...style }} onClick={this.onClick.bind(this)} />
            )
          );
        }
        else{
          style.left = l;
          style.top = t;

          var contentDiv;
          if (cheat > 0) contentDiv = (<div >{note}</div>);
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
