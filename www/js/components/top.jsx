import "../../../bower_components/bootstrap/dist/js/bootstrap.min.js";
import React from 'react';
import { Button, Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Keyboard from './keyboard';
import DataStore from './dataStore';
import DataActions from './dataActions';

export default class Top extends React.Component {
    constructor(props) {
       super(props);
       this.state = DataStore.getState();
       this.state.time = 0;
    }

    componentDidMount() {
      /*
      DataStore.listen(this.onChange.bind(this));
      this.timer = setInterval(function(){
        var st = this.state;
        st.time++;
        this.setState(st);
      }.bind(this), 1000);
      */
    }

    componentWillUnmount() {
      //clearInterval(this.timer);
      //DataStore.unlisten(this.onChange);
    }

    onChange(state) {
      //this.setState(state);
    }

    handleClick(menu, event) {
      switch(menu) {
        case 'save':
          DataActions.saveGame();
          break;
        case 'load':
          DataActions.loadGame();
          break;
        case 'restart':
          DataActions.restartGame();
          break;
        default:
          DataActions.restartGame(menu);
      }
    }

    render() {

      const menuItems = [];
      var i=0;
      for (var k of Keyboard.list){
        i++;
        menuItems.push(
          <MenuItem key={i} onClick={this.handleClick.bind(this, k.name)}>{k.name}</MenuItem>
        );
      }

      return (
        <div className="top">
          <Navbar>
            <NavBrand>K5
            </NavBrand>
            <Nav id='navitems'>
              <NavItem onClick={this.handleClick.bind(this, 'restart')}>Restart</NavItem>
              <NavItem onClick={this.handleClick.bind(this, 'save')}>Save</NavItem>
              <NavItem onClick={this.handleClick.bind(this, 'load')}>Load</NavItem>
              <NavDropdown title="Keyboards" id="basic-nav-dropdown">
                {menuItems}
              </NavDropdown>
              <NavItem >Seconds: {this.state.time}</NavItem>
              <NavItem >{this.state.message}</NavItem>
            </Nav>
          </Navbar>
        </div>
      );

    }
}
