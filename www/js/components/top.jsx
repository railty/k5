import React from 'react';
import { Button, Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Keyboard from './keyboard';
import { restartGame, saveGame, loadGame, msg } from './data';

export default class Top extends React.Component {
    constructor(props) {
       super(props);
       this.state = {time: 1};
    }

    componentDidMount() {
      this.timer = setInterval(function(){
        this.setState({time: this.state.time + 1});
      }.bind(this), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    handleClick(menu, event) {
      console.log(menu);
      switch(menu) {
        case 'save':
          saveGame();
          break;
        case 'load':
          loadGame();
          break;
        case 'restart':
          restartGame();
          break;
        default:
          restartGame(menu);
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
            <NavBrand>K5</NavBrand>
            <Nav>
              <NavItem onClick={this.handleClick.bind(this, 'restart')}>Restart</NavItem>
              <NavItem onClick={this.handleClick.bind(this, 'save')}>Save</NavItem>
              <NavItem onClick={this.handleClick.bind(this, 'load')}>Load</NavItem>
              <NavDropdown title="Keyboards" id="basic-nav-dropdown">
                {menuItems}
              </NavDropdown>
              <NavItem >Seconds: {this.state.time}</NavItem>
              <NavItem >{this.state.time}</NavItem>
            </Nav>
          </Navbar>
        </div>
      );
    }
}
