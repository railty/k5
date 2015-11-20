import React from 'react';

export default class Alert extends React.Component {
    componentDidMount() {
      $(".alert-dismissible").fadeTo(2000, 500).slideUp(500, function(){
          $(".alert-dismissible").alert('close');
      });
    }

    render() {
      var alert = this.props.message ? (
        <div id="message">
          <div className="alert alert-warning alert-dismissible" role="alert" style={{marginBottom: 0}}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
            {this.props.message}
          </div>
        </div>
      ) : null;

      return alert;
    }
}
