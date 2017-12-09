import * as React from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

const baseBallStyle = {
  display: 'block',
  borderRadius: '50%',
  position: 'relative',
  height: '40px',
  width: '40px',
  margin: '10px 10px',
};

const Ball = ({color, clicksToBlow}) => {
  const ballStyle = {...baseBallStyle};
  ballStyle.background = `radial-gradient(circle at 30% 30%, ${color}, black)`;

  if (clicksToBlow === 2) {
    const gradientColor = tinycolor(color).darken(20).toString();
    ballStyle.background = `radial-gradient(circle at 30% 30%, ${gradientColor}, ${color})`;
  } else if (clicksToBlow === 1) {
    ballStyle.background = `radial-gradient(circle at 80% 80%, yellow, ${color})`;
  }

  return (
    <figure style={ballStyle}></figure>
  );
};

Ball.propTypes = {
  color: PropTypes.string,
  clicksToBlow: PropTypes.number,
};

export default Ball;
