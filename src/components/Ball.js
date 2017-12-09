import * as React from 'react';
import PropTypes from 'prop-types';

const Ball = ({color, clicksToBlow, className}) => {
  const ballStyle = {
    background: `radial-gradient(circle at 30% 30%, ${color}, black)`,
  };

  let classes = 'ball';
  if (!className) {
    if (clicksToBlow === 1) {
      classes += ' shaking-more large-ball';
    } else if (clicksToBlow === 2) {
      classes += ' shaking medium-ball';
    }
  } else {
    classes += ` ${className}`;
  }

  return (
    <figure
      className={classes}
      style={ballStyle}
    />
  );
};

Ball.propTypes = {
  color: PropTypes.string,
  clicksToBlow: PropTypes.number,
  className: PropTypes.string,
};

export default Ball;
