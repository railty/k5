import alt from '../alt';

import {readFile, writeFile} from './file';
import Keyboard from './keyboard';
import DataActions from './dataActions';

class DataStore {
  constructor() {
    this.restartGame("88 Keys");
    this.message = "Ready!";

    this.bindListeners({
      restartGame: DataActions.restartGame,
      restartGameFinished: DataActions.restartGameFinished,
      dropFloor: DataActions.dropFloor,
      dropSlot: DataActions.dropSlot,
      saveGame: DataActions.saveGame,
      loadGame: DataActions.loadGame,
      setIndicator: DataActions.setIndicator,
      setMessage: DataActions.setMessage,
      tick: DataActions.tick,
    });

    this.exportPublicMethods({
      bSuccess: this.bSuccess.bind(this)
    });

  }

  restartGame(keyboardName){
    console.log("restart game");
    this.restarting = true;
    setTimeout(function(){
      if (keyboardName) this.keyboardName = keyboardName;
      DataActions.restartGameFinished(keyboardName);
    }.bind(this), 50);
  }

  restartGameFinished(keyboardName){
    console.log("restart game finished");
    this.restarting = false;

    if (keyboardName) this.keyboardName = keyboardName;

    var keyboard = new Keyboard(this.keyboardName);
    var id = 0;
    var height = window.innerHeight - 350;
    var width = window.innerWidth - 200;

    this.message = this.keyboardName + ":" + keyboard.keys().length + ":" + keyboard.whites().length*40;

    var keyWidth = 40;
    var keysPerSection = Math.floor(width/keyWidth);

    this.piano = keyboard.keys().map((key)=>{
      return {note:key, box:null};
    });

    this.floor = [];
    keyboard.keys().forEach((key)=>{
      this.floor.push({
        note: key,
        l: Math.round(Math.random()*width),
        t: Math.round(Math.random()*height + 50),
      });
    });
    this.message = "Game " + this.keyboardName + " restarted!";
  }

  dropFloor(dt) {
    var box = dt.box;
    var dest = dt.dest;

    //move the box from floor to floor
    var iFloor = this.floor.findIndex(b => {
      return b.note == box.note;
    });
    if (iFloor != -1){
      this.floor[iFloor].l = dest.x;
      this.floor[iFloor].t = dest.y;
    }

    //move the box from piano to floor
    var iPiano = this.piano.findIndex(b => {
      return b.box && (b.box.note == box.note);
    });
    if (iPiano != -1){
      this.piano[iPiano].box = null;
      this.floor.push({note: box.note, l: dest.x, t: dest.y});
    }
  }

  dropSlot(dt) {
    var box = dt.box;
    var slot = dt.slot;
    //drop to slot from another slot
    //remove from another slot first
    this.piano.forEach((st)=>{
      if ((st.box) && (st.box.note == box.note)) {
        st.box = null;
      }
    });

    //drop to slot from floor
    this.piano.forEach((st)=>{
      if (st.note == slot.note) {
        //this slot already has a box
        //move the box back to floor, using original position
        if (st.box) this.floor.push(st.box);
        st.box = box;
      }
    });

    var iFloor = this.floor.findIndex((key)=>{
      return key.note == box.note;
    });
    if (iFloor != -1)  this.floor.splice(iFloor, 1);

  }

  saveGame(){
    writeFile('data.json', this).then(function(){
      this.message = "Save success!";
    }.bind(this));
  }

  loadGame(){
    readFile('data.json').then(function(dt){
      this.floor = dt.floor;
      this.piano = dt.piano;
      this.message = "Load success!";
    }.bind(this));
  }

  setIndicator(indicator){
    this.indicator = indicator;
  }

  setMessage(msg){
    this.message = msg;
  }

  tick(){
    if (this.seconds) this.seconds++;
    else this.seconds = 0;
  }

  bSuccess(){
    return false;
    return this.piano.every((k)=>{
      return (k.box) && (k.note == k.box.note)
    });
  }
}

export default alt.createStore(DataStore, 'DataStore');
