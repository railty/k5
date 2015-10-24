import '../css/index.css';

//import '../css/bootstrap.css';
import '../../bower_components/bootstrap/dist/css/bootstrap.css';
import '../../bower_components/bootstrap/dist/js/bootstrap.js';

import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Game from './components/game';
import Graph from './components/graph';
import { keyboardList, restartGame } from './components/data';

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
    handleClick(keyboard, event) {
      restartGame(keyboard);
    }

    render () {
      const menuItems = [];
      var i=0;
      for (var k of keyboardList){
        i++;
        menuItems.push(
          <li key={i}><a onClick={this.handleClick.bind(this, k.name)}>{k.name}</a></li>
        );
      }

      return (
          <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">K5</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Link1 <span className="sr-only">(current)</span></a></li>
                  <li><a href="#">Link2</a></li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                    </a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Keyboard</a></li>
                      <li role="separator" className="divider"></li>
                      {menuItems}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {this.props.children}


          </div>
      )
    }
}

class App2 extends React.Component {
    render () {
      if(cordova.platformId == "browser"){
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
      else{
        return (
            <div>
              {this.props.children}
            </div>
        )
      }

    }
}

try {
    document.addEventListener('deviceready', () => {
        React.render((
          <Router>
            <Route path="/" component={App}>
              <IndexRoute component={Game} />
              <Route path="game" component={Game} />
              <Route path="graph" component={Graph} />
            </Route>
          </Router>
        ), document.getElementById("k5app"));
    }, false)
} catch (e) {
    handleError(e);
}
