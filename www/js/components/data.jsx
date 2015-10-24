let data = {
  msg: 'ready',
  floor: [],
  piano: [],
};

class Iterator{
  constructor(keyboard) {
     this.keyboard = keyboard;
     this.note = this.keyboard.firstNote;
     this.done = false;
  }
  next() {
    var note = this.note;
    var done = this.done;
    this.done = note==this.keyboard.lastNote;

    var n = note[0];
    var o = note.substr(-1);

    if (note.length==2){
      n = String.fromCharCode(n.charCodeAt(0) + 1);
      if (n == 'H') {
        n = 'A';
        o = String.fromCharCode(o.charCodeAt(0) + 1);
      }
      this.note = n + 'b' + o;
    }else{
      this.note = n + o;
    }
    return { value: note, done: done };
  }
}

class Keyboard{
  constructor(name) {
    var keyboard = Keyboard.list.find(function(k){
      return k.name == name;
    });
    this.name = keyboard.name;
    this.firstNote = keyboard.firstNote;
    this.lastNote = keyboard.lastNote;
  }

  [Symbol.iterator]() {
    var i = new Iterator(this);
    return i;
  }
}

Keyboard.list = [{
  name: '32 Keys',
  firstNote: 'C3',
  lastNote: 'G5'
},{
  name: '32 Keys Alt',
  firstNote: 'F2',
  lastNote: 'C5'
},{
  name: '36 Keys',
  firstNote: 'C3',
  lastNote: 'B5'
},{
  name: '36 Keys Alt',
  firstNote: 'F2',
  lastNote: 'E5'
},{
  name: '37 Keys',
  firstNote: 'C2',
  lastNote: 'C5'
},{
  name: '37 Keys Alt',
  firstNote: 'F2',
  lastNote: 'F5'
},{
  name: '49 Keys',
  firstNote: 'C2',
  lastNote: 'C6'
},{
  name: '54 Keys',
  firstNote: 'C2',
  lastNote: 'F6'
},{
  name: '61 Keys',
  firstNote: 'C1',
  lastNote: 'C6'
},{
  name: '76 Keys',
  firstNote: 'E1',
  lastNote: 'G7'
},{
  name: '88 Keys',
  firstNote: 'A0',
  lastNote: 'C8'
}];

initGame('49 Keys');

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

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function bSuccess() {
  return data.piano.every(item => {
    return item.box && (item.box.k == item.k);
  });
}

export function msg(txt) {
  data.msg = txt;
}

export function getAudioCtx() {
  return audioCtx;
}

function initGame(keyboardName){
  var keys = new Keyboard(keyboardName);
  var id = 0;
  var height = window.innerHeight - 350;
  var width = window.innerWidth - 50;
  data.floor = [];
  data.piano = [];
  for (let key of keys) {
    id++;
    data.piano.push({
      color: key.length == 2 ? 'white' : 'black',
      note: key.substr(0, key.length-1),
      octave: key.substr(-1),
      k: id,
      box: null,
    });

    if ((key.length==3)&&((key.substr(0, 2)=='Cb')||(key.substr(0, 2)=='Fb'))){
//      console.log("skip " + key);
    }else{
      data.floor.push({
        color: key.length == 2 ? 'white' : 'black',
        note: key.substr(0, key.length-1),
        octave: key.substr(-1),
        k: id,
        l: Math.round(Math.random()*width),
        t: Math.round(Math.random()*height),
      });
    }
  }
}

export const keyboardList = Keyboard.list;
export function restartGame(keyboardName){
  initGame(keyboardName);
  emitChange();
}
