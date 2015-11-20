import React from 'react'
import { Button, Alert, Glyphicon } from 'react-bootstrap';

export default class Message extends React.Component {
    constructor(props) {
      super(props);
      this.state = {alertVisible: true};
    }

    handleAlertDismiss() {
      this.setState({alertVisible: false});
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.message != this.props.message) this.setState({alertVisible: true});
    }

    render () {
      return (!this.state.alertVisible) ? null : (
        <div id="message">
          <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss.bind(this)} dismissAfter={2000}>
            {this.props.message}
          </Alert>
        </div>
      );
    }
}
