import React, { Component, PropTypes } from 'react';
import Box from './box';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

export default class BoxDragPreview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { data } = this.props;
    return (
      <div style={styles}>
        <Box preview data={data} />
      </div>
    );
  }
}
