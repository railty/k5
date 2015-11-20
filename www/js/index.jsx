import '../less/index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import DataStore from './components/dataStore';
import DataActions from './components/dataActions';
import Game from './components/game';
import Hamburger from './components/hamburger';
import OptionDialog from './components/optionDialog';
import Message from './components/message';

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
    DataStore.listen(this.onChange.bind(this));
    this.timer = setInterval(function(){
      DataActions.tick();
    }.bind(this), 1000000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    DataStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    console.log("change: " + this.state.message);
  }

  render() {
    console.log("render index");

    return (
      <div>
        <Game floor={this.state.floor} piano={this.state.piano}/>
        <Hamburger />
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
