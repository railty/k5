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
      dropFloor: DataActions.dropFloor,
      dropSlot: DataActions.dropSlot,
      saveGame: DataActions.saveGame,
      loadGame: DataActions.loadGame,
    });
/*
    this.exportPublicMethods({
      getLocation: this.getLocation
    });
*/
  }

  restartGame(keyboardName){
    console.log("restart game");
    if (keyboardName) this.keyboardName = keyboardName;

    var keyboard = new Keyboard(this.keyboardName);
    var id = 0;
    var height = window.innerHeight - 350;
    var width = window.innerWidth - 50;
    this.message = this.keyboardName + ":" + keyboard.keys().length + ":" + keyboard.whites().length*40;

    var keyWidth = 40;
    var keysPerSection = Math.floor(width/keyWidth);

    var sections = keyboard.sections(keysPerSection);
    this.piano = sections.map((section)=>{
      return section.map((key)=>{
        return {note:key, box:null}
      });
    });

    this.floor = [];
    keyboard.keys().forEach((key)=>{
      this.floor.push({
        note: key,
        l: Math.round(Math.random()*width),
        t: Math.round(Math.random()*height),
        box: null,
      });
    });

    //this.message = "Game restarted!";
  }

  dropFloor(dt) {
    var box = dt.box;
    var dest = dt.dest;
    var iPiano = this.piano.findIndex(item => {
      return (item.box) && (item.box.k == box.k);
    });

    if (iPiano != -1){
      this.piano[iPiano].box = null;
      this.floor.push(box);
    }

    var iFloor = this.floor.findIndex(b => {
      return b.k == box.k;
    });

    if (iFloor != -1){
      this.floor[iFloor].l = dest.x;
      this.floor[iFloor].t = dest.y;
    }
  }

  dropSlot(dt) {
    var box = dt.box;
    var slot = dt.slot;
    var iFloor = this.floor.findIndex(b => {
      return b.k == box.k;
    });

    if (iFloor != -1) this.floor.splice(iFloor, 1);

    var iBox = this.piano.findIndex(item => {
      return item.box && (item.box.k == box.k);
    });
    if (iBox != -1){
      this.piano[iBox].box = null;
    }

    var iSlot = this.piano.findIndex(item => {
      return item.k == slot.k;
    });
    if (iSlot != -1){
      if (this.piano[iSlot].box){
        this.floor.push(this.piano[iSlot].box);
      }
      this.piano[iSlot].box = box;
    }
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
}

export default alt.createStore(DataStore, 'DataStore');
