import alt from '../alt';

class DataActions{
  setMessage(msg){
    this.dispatch(msg);
  }

  setIndicator(indicator){
    this.dispatch(indicator);
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

  tick(){
    this.dispatch();
  }

  openOptionDialog(options){
    this.dispatch(options);
  }

}

export default alt.createActions(DataActions);
