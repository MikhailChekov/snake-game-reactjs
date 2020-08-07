import React from 'react';

const Fruit = (props) => {

  const style = {
    left: `${props.fruitBody[0]}%`,
    top: `${props.fruitBody[1]}%`
  }

  return (
    <div className="fruit" style={style}></div>
  )
}

export default Fruit;