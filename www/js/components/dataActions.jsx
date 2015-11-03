import alt from '../alt';

class DataActions{
  tick(){
    this.dispatch();
  }

  restartGame(keyboardName){
    this.dispatch(keyboardName);
  }

  dropFloor(dt){
    this.dispatch(dt);
  }

  dropSlot(dt){
    this.dispatch(dt);
  }

  saveGame(){
    this.dispatch();
  }

  loadGame(){
    this.dispatch();
  }

}

export default alt.createActions(DataActions);
