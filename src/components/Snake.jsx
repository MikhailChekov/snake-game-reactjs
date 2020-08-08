import React from 'react';

const Snake = ({snakeBody}) => {
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