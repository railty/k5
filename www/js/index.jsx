import '../css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import Graph from './components/graph';
import Top from './components/top';

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
    render() {
      return (
        <div>
          <Top />
          <Game />
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
