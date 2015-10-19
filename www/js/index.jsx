import '../css/index.css'
import React from 'react'
import { Router, Route, Link } from 'react-router'

import Game from './components/game'
import Graph from './components/graph'

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
    render () {
        return (
            <div>
              <ul>
                <li><Link to="/Game">Game</Link></li>
                <li><Link to="/graph">Graph</Link></li>
              </ul>

              {this.props.children}
            </div>
        )
    }
}

try {
    document.addEventListener('deviceready', () => {

        React.render((
          <Router>
            <Route path="/" component={App}>
              <Route path="game" component={Game} />
              <Route path="graph" component={Graph} />
            </Route>
          </Router>
        ), document.body)

    }, false)
} catch (e) {
    handleError(e);
}
