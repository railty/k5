let data = {
  floor: [
    {color:'white', note: '1C', k: 20, l: 0, t: 0},
    {color:'black', note: '1Cs', k: 21, l: 10, t: 20},
    {color:'black', note: '2C', k: 22, l: 20, t: 40},
    {color:'black', note: '2Cs', k: 23, l: 30, t: 60},
  ],
  piano: [
    {color:'white', note: '1C', k: 20, box: null},
    {color:'white', note: '1Cs', k: 21, box: null},
    {color:'white', note: '2C', k: 22, box: null},
    {color:'white', note: '2Cs', k: 23, box: null},
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

export function dropBox(box, slotName, dlt) {
  if (slotName=='floor'){
    var index = data.floor.findIndex(b => {
      return b.k == box.k;
    });

    if (index == -1){

    }
    else{
      data.floor[index].l += dlt.x;
      data.floor[index].t += dlt.y;
    }
    /*
    var index = data.piano.findIndex(slot => {
      return slot.key.k == box.k;
    });
    data.piano.splice(index, 1);
    data.floor.push(box);
    */
  }
  else{
  }

  emitChange();
}
