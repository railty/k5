class NotesIterator{
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

class Notes{
  constructor(firstNote, lastNote) {
    this.firstNote = firstNote;
    this.lastNote = lastNote;
  }

  [Symbol.iterator]() {
    var i = new NotesIterator(this);
    return i;
  }

  slots(){
    var ks = [];
    for (let key of this){
      ks.push(key);
    }
    return ks;
  }

  keys(){
    return this.slots().filter( (slot) => {
      return (!((slot.length==3)&&((slot.substr(0, 2)=='Cb')||(slot.substr(0, 2)=='Fb'))));
    });
  }

  whites(){
    return this.keys().filter((key)=>{
      return (key.length==2);
    });
  }

  blacks(){
    return this.keys().filter((key)=>{
      return (key.length==3);
    });
  }
}

class Keyboard extends Notes {
  constructor(name) {
    var keyboard = Keyboard.list.find(function(k){
      return k.name == name;
    });
    super(keyboard.firstNote, keyboard.lastNote);
    this.name = keyboard.name;
  }

  middleC(){
    var cs = this.whites().filter((k) => {
      return (k[0]=='C');
    });
    var mc = cs[Math.floor(cs.length / 2)];
    return mc;
  }

  leftSection(sec, n){
    var whites = this.whites();
    var last = whites.indexOf(sec[0]);
    var section = whites.slice(last-n >= 0 ? last - n : 0, last);
    return section;
  }

  rightSection(sec, n){
    var whites = this.whites();
    var last = whites.indexOf(sec[sec.length-1]);
    var section = whites.slice(last + 1, last + n + 1);
    return section;
  }

  sections(n){
    var whites = this.whites();
    var mc = whites.indexOf(this.middleC());
    var i = Math.floor(n/2);

    var sections = [];
    var mSection = whites.slice(mc-i>=0 ? mc-i : 0, mc+i);

    var section = mSection;
    sections.push(section);
    do {
      section = this.leftSection(section, n);
      if (section.length>0) sections.push(section);
    } while (section.length == n);

    sections.reverse();

    var section = mSection;
    do {
      section = this.rightSection(section, n);
      if (section.length>0) sections.push(section);
    } while (section.length == n);

    var slotSections = sections.map((section) => {
      var notes = new Notes(section[0], section[section.length-1]);
      return notes.slots();
    });
    return slotSections;
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
