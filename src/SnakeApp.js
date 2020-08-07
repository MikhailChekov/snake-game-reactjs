import React, { Component } from 'react';
import Snake from './components/Snake';
import Fruit from './components/Fruit';
import {
    UP,
    DOWN ,
    LEFT,
    RIGHT,
    SNAKE_START,
    FRUIT_START,
    SPEED_START,
    POINTS_START,

} from './constants.js';

const initialState = {
  isGameOn: false,
  fruit: FRUIT_START,
  direction: RIGHT,
  snakeBody: SNAKE_START,
  points: POINTS_START,
}

class SnakeApp extends Component {

  constructor(){
    super();
    this.state = initialState;
    this.intervalID = null;
    this.speed = SPEED_START;
  }

  componentDidMount() {
      document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    if(this.state.isGameOn){
      this.isCrushToBorder();
      this.isCrushToSnake();
      this.isAteFruit();
    }
  }
  componentWillUnmount() {
    if(!this.state.isGameOn){
      clearInterval(this.intervalID);
    }
 }

  onKeyDown = (e) => {
    const { direction } = this.state;
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        if(direction === DOWN) return;
        this.setState({direction: UP});
        break;
      case 40:
        if(direction === UP) return;
        this.setState({direction: DOWN});
        break;
      case 37:
        if(direction === RIGHT) return;
        this.setState({direction: LEFT});
        break;
      case 39:
        if(direction === LEFT) return;
        this.setState({direction: RIGHT});
        break;
    }
  }

  moveSnake = () => {
    let snakeCopy = [...this.state.snakeBody];
    let head = snakeCopy[snakeCopy.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 5, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 5, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 5];
        break;
      case 'UP':
        head = [head[0], head[1] - 5];
        break;
    }
    snakeCopy.push(head);
    snakeCopy.shift();
    this.setState({
      snakeBody: snakeCopy
    })
  }

  isCrushToBorder = () => {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }

  isCrushToSnake = () => {
    let snake = [...this.state.snakeBody];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    })
  }

  isAteFruit = () => {
    let { snakeBody, fruit } = this.state;
    let head = snakeBody[snakeBody.length - 1];

    if (head[0] === fruit[0] && head[1] === fruit[1]) {
      this.setState(({points}) =>({
        points: ++points,
        fruit: this.getRandomCoordinates(),
      }))
      this.increaseSnakeSize();
      this.increaseSpeed();
    }
  }

  increaseSnakeSize = () => {
    let snakeCopy = [...this.state.snakeBody];
    snakeCopy.unshift([])
    this.setState({
      snakeBody: snakeCopy,
    })
  }

  increaseSpeed = () => {
    if (this.speed > 10) {
      
      clearInterval(this.intervalID);
      this.intervalID = null;

      this.speed -= 10;
      this.intervalID = setInterval(this.moveSnake, this.speed);
    }
  }

  getRandomCoordinates = () => {
    let min = 1;
    let max = 20;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*5;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*5;
    return [x,y]
  }

  gameOver = () => { 
    clearInterval(this.intervalID);
    this.speed = SPEED_START;
    this.setState(initialState);
  }

  startNewGame = () => {
    if(this.state.isGameOn) return;
    this.intervalID = setInterval(this.moveSnake, this.speed);
    this.setState({
      isGameOn: true,
    });
  }

  render() {
    const { snakeBody, points,  fruit, isGameOn } = this.state;
    return (
      <div className="center">
        <h1>Змейка на React Js</h1>
        <div className="gameField">
          {isGameOn && <Snake snakeBody={snakeBody}/>}
          {isGameOn && <Fruit fruitBody={fruit}/>}
        </div>
        {isGameOn && <div className="pointsText">Вы набрали:  <span class="points">{points}</span></div>}
        {!isGameOn && <button className="newGame" onClick={this.startNewGame}>New game</button>}
      </div>
    );
  }
}

export default SnakeApp;
