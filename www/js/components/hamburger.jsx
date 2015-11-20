import React from 'react';
import DataActions from './dataActions';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';

export default class Hamburger extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelect(e, eventKey){
    switch(eventKey) {
      case 'restart':
        DataActions.restartGame();
        break;
      case 'load':
        DataActions.loadGame();
        break;
      case 'save':
        DataActions.saveGame();
        break;
      case 'options':
        DataActions.openOptionDialog();
        break;
      default:
    }
  }

  render(){
    return (
      <Dropdown id="humburger"  style={{position:'absolute', top: 20, left: 20}}>
        <Dropdown.Toggle bsStyle="danger">
          <Glyphicon glyph="menu-hamburger" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem eventKey="restart" onSelect={this.onSelect.bind(this)}>Restart</MenuItem>
          <MenuItem eventKey="save" onSelect={this.onSelect.bind(this)}>Save</MenuItem>
          <MenuItem eventKey="load" onSelect={this.onSelect.bind(this)}>Load</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="options" onSelect={this.onSelect.bind(this)}>Options...</MenuItem>

        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

/*
//this is the version of multiple level menu, direct using jquery and bootstrap
export default class Hamburger extends React.Component {

    componentDidMount() {
      $(".dropdown-menu > li > a.trigger").on("click",function(e){
        var current=$(this).next();
        var grandparent=$(this).parent().parent();
        if($(this).hasClass('left-caret')||$(this).hasClass('right-caret')) $(this).toggleClass('right-caret left-caret');
        grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
        grandparent.find(".sub-menu:visible").not(current).hide();
        current.toggle();
        e.stopPropagation();
      });

      $(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
        console.log($(this).html());
        var root=$(this).closest('.dropdown');
        root.find('.left-caret').toggleClass('right-caret left-caret');
        root.find('.sub-menu:visible').hide();

        if ($(this).data('menu')=='restart') DataActions.restartGame();
        else if ($(this).data('menu')=='save') DataActions.saveGame();
        else if ($(this).data('menu')=='load') DataActions.loadGame();
        //$(this).append(" <span class='glyphicon glyphicon-ok'></span>");
      });
    }

    componentWillUnmount() {
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
      <div className="dropdown top">
        <a href="#" className="btn dropdown-toggle" data-toggle="dropdown">
          <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
        </a>
        <ul className="dropdown-menu">
          <li><a href="#" data-menu='restart'>Restart</a></li>
          <li><a href="#" data-menu='save'>Save</a></li>
          <li><a href="#" data-menu='load'>Load</a></li>
          <li>
            <a className="trigger right-caret">Level 1</a>
            <ul className="dropdown-menu sub-menu">
              <li><a href="#">Level 2</a></li>
              <li><a href="#">Level 2</a></li>
            </ul>
          </li>
          <li><a href="#">Level 1</a></li>
        </ul>
      </div>
      );
    }
}
*/
