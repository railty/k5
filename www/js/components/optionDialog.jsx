import React from 'react';
import ReactDOM from 'react-dom';
import { DropdownButton, MenuItem, Input, Button, Popover, OverlayTrigger, Modal, Glyphicon } from 'react-bootstrap';

import Keyboard from './keyboard';
import DataStore from './dataStore';
import DataActions from './dataActions';

export default class OptionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.options;
  }

  closeDialog() {
    DataActions.openOptionDialog({
      bShow: false,
      bShowNoteInFloorBox: this.refs.cbShowNoteInFloorBox.getChecked(),
      bPianoBoxColorHint: this.refs.cbPianoBoxColorHint.getChecked(),
      keyboardName: ReactDOM.findDOMNode(this.refs.keyboardName).querySelector("button span").innerText,
    });
  }

  handleChange(){
    this.setState({
      bShow: false,
      bShowNoteInFloorBox: this.refs.cbShowNoteInFloorBox.getChecked(),
      bPianoBoxColorHint: this.refs.cbPianoBoxColorHint.getChecked(),
    });
  }

  changeKeyboard(e, eventKey){
    DataActions.restartGame(eventKey);
  }

  render(){
    let popoverDifficultLevel = (<Popover id="difficult-level" title="difficult level">this change the difficult level of the game</Popover>);
    let cbShowNoteInFloorBox = <Input ref='cbShowNoteInFloorBox' type="checkbox" label="Show Note In Floor Box" checked={this.state.bShowNoteInFloorBox} onChange={this.handleChange.bind(this)} />;
    let cbPianoBoxColorHint = <Input  ref="cbPianoBoxColorHint" type="checkbox" label="Piano Box Color Hint" checked={this.state.bPianoBoxColorHint} onChange={this.handleChange.bind(this)} />;

    var menuitems = Keyboard.list.map((keyboard, i)=>{
      return (<MenuItem key={i} eventKey={keyboard.name} onSelect={this.changeKeyboard.bind(this)}>{keyboard.name}</MenuItem>);
    });

    //the keyboardName is coming from props, which is coming from datastore, which is set by the data action
    //the checkbox is a different route, it is saved locally here as state
    return (
      <Modal show={this.props.options.bShow} onHide={this.closeDialog.bind(this)}>
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
          <hr/>

          <h4>Choose keyboard</h4>
            <DropdownButton ref="keyboardName" bsStyle='default' title={this.props.options.keyboardName} id='keyboard'>
              {menuitems}
            </DropdownButton>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeDialog.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
