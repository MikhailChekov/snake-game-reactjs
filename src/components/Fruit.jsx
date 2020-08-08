import React from 'react';

const Fruit = ({fruitBody}) => {

  const style = {
    left: `${fruitBody[0]}%`,
    top: `${fruitBody[1]}%`
  }

  return (
    <div className="fruit" style={style}></div>
  )
}

export default Fruit;