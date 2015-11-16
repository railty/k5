import alt from '../alt';

import {readFile, writeFile} from './file';
import Keyboard from './keyboard';
import DataActions from './dataActions';

class DataStore {
  constructor() {
    this.restartGame("76 Keys");
    this.message = "Ready!";

    this.bindListeners({
      restartGame: DataActions.restartGame,
      restartGameFinished: DataActions.restartGameFinished,
      dropFloor: DataActions.dropFloor,
      dropSlot: DataActions.dropSlot,
      saveGame: DataActions.saveGame,
      loadGame: DataActions.loadGame,
      setIndicator: DataActions.setIndicator,
    });
  }

  restartGame(keyboardName){
    console.log("restart game");
    this.restarting = true;
    setTimeout(function(){
      if (keyboardName) this.keyboardName = keyboardName;
      DataActions.restartGameFinished(keyboardName);
    }.bind(this), 100);
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
        t: Math.round(Math.random()*height),
      });
    });
    //this.message = "Game restarted!";
  }

  dropFloor(dt) {
    var box = dt.box;
    var dest = dt.dest;
    /*
    var iPiano = this.piano.findIndex(item => {
      return (item.box) && (item.box.k == box.k);
    });
    */
    debugger;
    /*
    this.piano.forEach((section)=>{
      section.forEach((st)=>{
        if ((st.box) && (st.box.note == box.note)) {
          st.box = null;
          this.floor.push(box);
        }
      });
    });
    */
/*
    if (iPiano != -1){
      this.piano[iPiano].box = null;
      this.floor.push(box);
    }
*/

    var iFloor = this.floor.findIndex(b => {
      return b.note == box.note;
    });
    if (iFloor != -1){
      console.log(iFloor);
      this.floor[iFloor].l = dest.x;
      this.floor[iFloor].t = dest.y;
    }
  }

  dropSlot(dt) {
    var box = dt.box;
    var slot = dt.slot;
debugger;
    this.piano.forEach((key)=>{
      if (key.note == slot.note) {
        key.box = box;
      }
    });

    var idx = this.floor.findIndex((key)=>{
      return key.note == box.note;
    });
    this.floor.splice(idx, 1);

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
}

export default alt.createStore(DataStore, 'DataStore');
