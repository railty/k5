import Keyboard from './keyboard';
import {readFile, writeFile} from './file';

class Data{
  constructor(dt) {
    if (typeof dt == "string"){
      this.keyboardName = dt;
      this.msg = 'ready';
      this.floor = [];
      this.piano = [];

      var keys = new Keyboard(this.keyboardName);
      var id = 0;
      var height = window.innerHeight - 350;
      var width = window.innerWidth - 50;

      for (let key of keys) {
        id++;
        this.piano.push({
          note: key.substr(0, key.length-1),
          octave: key.substr(-1),
          k: id,
          box: null,
        });

        if ((key.length==3)&&((key.substr(0, 2)=='Cb')||(key.substr(0, 2)=='Fb'))){
          //console.log("skip " + key);
        }else{
          this.floor.push({
            note: key.substr(0, key.length-1),
            octave: key.substr(-1),
            k: id,
            l: Math.round(Math.random()*width),
            t: Math.round(Math.random()*height),
          });
        }
      }
    }
    else{
      this.msg = dt.msg;
      this.floor = dt.floor;
      this.piano = dt.piano;
      this.keyboardName = dt.keyboardName;
    }
  }

  save(){
    writeFile('data.json', this).then(function(){
      console.log("save success");
    });
  }
  pianoView(idx){
    return this.piano.slice((idx-1)*20, idx*20);
  }
}

Data.load = function(){
  readFile('data.json').then(function(dt){
    data = new Data(dt);
    console.log("load success");
    emitChange();
  });
}

var data = new Data("32 Keys");

let observer = null;
function emitChange() {
  observer(data);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();

  return () => {
    observer = null;
  };
}

export function dropFloor(box, dest) {
  var iPiano = data.piano.findIndex(item => {
    return (item.box) && (item.box.k == box.k);
  });

  if (iPiano != -1){
    data.piano[iPiano].box = null;
    data.floor.push(box);
  }

  var iFloor = data.floor.findIndex(b => {
    return b.k == box.k;
  });

  if (iFloor != -1){
    data.floor[iFloor].l = dest.x;
    data.floor[iFloor].t = dest.y;
  }

  emitChange();
}

export function dropSlot(box, slot) {
  var iFloor = data.floor.findIndex(b => {
    return b.k == box.k;
  });

  if (iFloor != -1) data.floor.splice(iFloor, 1);

  var iBox = data.piano.findIndex(item => {
    return item.box && (item.box.k == box.k);
  });
  if (iBox != -1){
    data.piano[iBox].box = null;
  }

  var iSlot = data.piano.findIndex(item => {
    return item.k == slot.k;
  });
  if (iSlot != -1){
    if (data.piano[iSlot].box){
      data.floor.push(data.piano[iSlot].box);
    }
    data.piano[iSlot].box = box;
  }

  emitChange();
}

export function bSuccess() {
  return data.piano.every(item => {
    return item.box && (item.box.k == item.k);
  });
}

export function msg(txt) {
  if (txt){
    data.msg = txt;
  }
  return data.msg;
}

export function restartGame(keyboardName){
  debugger;
  if (keyboardName) data = new Data(keyboardName);
  else data = new Data(data.keyboardName);
  msg("game restarted");
  emitChange();
}
export function saveGame(){
  data.save();
}
export function loadGame(){
  Data.load();
}
