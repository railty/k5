let data = {
  floor: [
    {color:'white', note: '1C', k: 20, l: 0, t: 0},
    {color:'black', note: '1Cs', k: 21, l: 30, t: 30},
    {color:'black', note: '2C', k: 22, l: 60, t: 60},
    {color:'black', note: '2Cs', k: 23, l: 90, t: 90},
  ],
  piano: [
    {color:'white', note: '1C',  k: 20, box:null},
    {color:'white', note: '1Cs', k: 21, box:null},
    {color:'white', note: '2C',  k: 22, box:null},
    {color:'white', note: '2Cs', k: 23, box:null},
  ]
};

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
    console.log(item);
    console.log(item.box);
    return item.box && (item.box.k == item.k);
  });
}
