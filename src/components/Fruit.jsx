import React from 'react';
import PropTypes from 'prop-types';

const Fruit = ({ fruitBody }) => {
  Fruit.propTypes = {
    fruitBody: PropTypes.array.isRequired,
  }
  Fruit.defaultProps = {
    fruitBody: [],
  }

  const style = {
    left: `${fruitBody[0]}%`,
    top: `${fruitBody[1]}%`
  }

  return (
    <div className="fruit" style={style}></div>
  )
}

export default Fruit;