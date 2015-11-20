import alt from '../alt';

class DataActions{
  setMessage(msg){
    this.dispatch(msg);
  }

  setIndicator(indicator){
    this.dispatch(indicator);
  }

  tick(){
    this.dispatch();
  }

  restartGame(keyboardName){
    this.dispatch(keyboardName);
  }
  restartGameFinished(keyboardName){
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
