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

  middleC(){
    var cs = this.whites().filter((k) => {
      return (k[0]=='C');
    });
    var mc = cs[Math.floor(cs.length / 2)];
    return mc;
  }

  leftSection(sec, n){
    var slots = this.slots();
    var last = slots.indexOf(sec[0]);
    var section = slots.slice(last-n >= 0 ? last - n : 0, last);
    return section;
  }

  rightSection(sec, n){
    var slots = this.slots();
    var last = slots.indexOf(sec[sec.length-1]);
    var section = slots.slice(last + 1, last + n + 1);
    return section;
  }

  sections(n){
    var slots = this.slots();
    var mc = slots.indexOf(this.middleC());
    var i = Math.floor(n/2);

    var sections = [];
    var mSection = slots.slice(mc-i>=0 ? mc-i : 0, mc+i);

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

    return sections;
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
