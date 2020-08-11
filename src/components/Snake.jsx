import React from 'react';
import PropTypes from 'prop-types';

const Snake = ({ snakeBody }) => {
  Snake.propTypes = {
    snakeBody: PropTypes.array.isRequired,
  }
  Snake.defaultProps = {
    snakeBody: [],
  }

  return (
    <div>
      {snakeBody.map((item, i) => {
        const style = {
          left: `${item[0]}%`,
          top: `${item[1]}%`
        }
        return (
          <div className="snakeBody" key={i} style={style}></div>
        )
      })}
    </div>
  )
}
export default Snake;