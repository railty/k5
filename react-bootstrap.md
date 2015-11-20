to patch the react-bootstrap, alert functions

renderDismissButton: function renderDismissButton() {
  return _react2['default'].createElement(
    'button',
    {
      type: 'button',
      className: 'close',
      onClick: this.props.onDismiss,
      'aria-hidden': 'true' },
    _react2['default'].createElement(
      'span',
      {
        className: "glyphicon glyphicon-remove",
        'aria-hidden': true
      },
      ''
    )
  );
},
