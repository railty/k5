import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, Popover, OverlayTrigger, Modal, Glyphicon } from 'react-bootstrap';

import Keyboard from './keyboard';
import DataStore from './dataStore';
import DataActions from './dataActions';

export default class OptionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.options;
  }

  closeDialog() {
    debugger;
    var x = ReactDOM.findDOMNode(this.refs.cbPianoBoxColorHint).checked;
    DataActions.openOptionDialog({
      bShow: false,
      bShowNoteInFloorBox: ReactDOM.findDOMNode(this.refs.cbShowNoteInFloorBox).checked,
      bPianoBoxColorHint: ReactDOM.findDOMNode(this.refs.cbPianoBoxColorHint).checked,
    });
  }

  handleChange(){
    this.setState({
      bShow: false,
      bShowNoteInFloorBox: ReactDOM.findDOMNode(this.refs.cbShowNoteInFloorBox).checked,
      bPianoBoxColorHint: ReactDOM.findDOMNode(this.refs.cbPianoBoxColorHint).checked,
    });
  }

  render(){
    let popoverDifficultLevel = (<Popover id="difficult-level" title="difficult level">this change the difficult level of the game</Popover>);
    let cbShowNoteInFloorBox = <Input ref='cbShowNoteInFloorBox' type="checkbox" label="Show Note In Floor Box" checked={this.state.bShowNoteInFloorBox} onChange={this.handleChange.bind(this)} />;
    let cbPianoBoxColorHint = <Input  ref="cbPianoBoxColorHint" type="checkbox" label="Piano Box Color Hint" checked={this.state.bPianoBoxColorHint} onChange={this.handleChange.bind(this)} />;

    return (
      <Modal show={this.props.options.bShow} onHide={this.closeDialog}>
        <Modal.Header >
          <button type='button' className='close' aria-label='Close' onClick={this.closeDialog.bind(this)}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
          <Modal.Title>Options</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4><OverlayTrigger overlay={popoverDifficultLevel}><a href="#">Difficult level</a></OverlayTrigger></h4>
          {cbShowNoteInFloorBox}
          {cbPianoBoxColorHint}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeDialog.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
