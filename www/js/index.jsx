import '../less/index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import DataStore from './components/dataStore';
import DataActions from './components/dataActions';
import Game from './components/game';
import Hamburger from './components/hamburger';
import OptionDialog from './components/optionDialog';
import Message from './components/message';
import Time from './components/time';

Promise.onPossiblyUnhandledRejection(err => {
    throw err
})

window.handleError = e => {
    console.error('error', e, e.stack);
    alert(e.stack);
}

window.onerror = (msg, url, line, column, e) => {
    window.handleError(e ? e : new Error(msg + '(' + url + '):' + line + '-' + column));
    return true;
}

class App extends React.Component {
  constructor(props) {
     super(props);
     this.state = DataStore.getState();
  }

  componentDidMount() {
    this.timer = setInterval(function(){
      DataActions.tick();
    }.bind(this), 1000);
    this.unlisten = DataStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    this.unlisten();
    clearInterval(this.timer);
  }

  onChange(state) {
    this.setState(state);
    //console.log(this.state);

  }

  render() {
    return (
      <div>
        <Game floor={this.state.floor} piano={this.state.piano}/>
        <Hamburger />
        <Time seconds={this.state.seconds}/>
        <OptionDialog options={this.state.options} />
        <Message message={this.state.message} />
      </div>
    );
  }
}

try {
    document.addEventListener('deviceready', () => {
        ReactDOM.render((
          <App />
        ), document.getElementById("app"));
    }, false);
} catch(e) {
    handleError(e);
}
