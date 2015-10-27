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

export default Keyboard;
