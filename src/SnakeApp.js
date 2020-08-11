import React, { Component } from 'react';
import Snake from './components/Snake';
import Fruit from './components/Fruit';
import Results from './components/Results';
import SaveResultsForm from './components/SaveResultsForm';
import PlayData from './components/PlayData';
import getResultsList from './components/getResultsList';

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
  fruit: FRUIT_START,
  direction: RIGHT,
  snakeBody: SNAKE_START,
  points: POINTS_START,
  isGameOn: false,
  showForm: false,
  inputTextValue: '',
  //getting results list from local storage
  resultsList: getResultsList(),
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
      let sign = true;
      this.isCrushToBorder();
      this.isCrushToSnake(sign);
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

  isCrushToSnake = (sign, fruit) => {
    let snake = [...this.state.snakeBody];
    let head = snake[snake.length - 1];
    if(sign){
      snake.pop();
      snake.forEach(item => {
        if (head[0] === item[0] && head[1] === item[1]) {
          this.gameOver();
        }
      })
    }else{
      let fruitOnSnake = false;
      snake.forEach(item => {
        if (fruit[0] === item[0] && fruit[1] === item[1]) {
          fruitOnSnake = true;
        }
      })
      return fruitOnSnake;
    }
   
  }

  isAteFruit = () => {
    let { snakeBody, fruit } = this.state;
    let head = snakeBody[snakeBody.length - 1];

    if (head[0] === fruit[0] && head[1] === fruit[1]) {
      this.setState(({points}) =>({
        points: ++points,
        fruit: this.getNewFruitPosition(),
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

      this.speed -= 8;
      this.intervalID = setInterval(this.moveSnake, this.speed);
    }
  }

  getNewFruitPosition = () => {
    let min = 1;
    let max = 20;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*5;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*5;
    let fruit = [x, y];
    if(this.isCrushToSnake(false, fruit)){
      return this.getNewFruitPosition(); 
    }else{
      return fruit;
    }
  }

  handleInputOnChange = ({target: {value}}) => {
    this.setState({inputTextValue: value});
  }

  gameOver = () => { 
    clearInterval(this.intervalID);
    this.speed = SPEED_START;
    this.setState({isSaveResultsOpen: true, isGameOn: false});
  }

  saveResults = () => {
    const { inputTextValue, points, resultsList } = this.state;
    resultsList.push({player: inputTextValue, score: points });
    localStorage.setItem('playersList', JSON.stringify(resultsList));
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
    const { snakeBody, points,  fruit, isGameOn, inputTextValue, isSaveResultsOpen, resultsList} = this.state;
    const sortedResults = (resultsList.sort((a,b) => b.score - a.score)).splice(0,15);
    const canShowResults = sortedResults && sortedResults.length > 0 && !isGameOn;
    return (
      <>
      {   
          // Show game part
        !isSaveResultsOpen
          ?
            <div className="center">
              <h1 className="title">Змейка на React Js</h1>
              <div className="gameField">
                <Snake snakeBody={snakeBody}/> 
                <Fruit fruitBody={fruit}/>
              </div>
              {isGameOn && <PlayData points={points} />}
              {!isGameOn && <button className="newGame" onClick={this.startNewGame}>Новая игра</button>}
              {canShowResults && <Results results={sortedResults} /> }
            </div>
          :
          // Or show save results form
          <SaveResultsForm 
            points={points} 
            onChange={this.handleInputOnChange} 
            onClick={this.saveResults} 
            value={inputTextValue} 
          />
      }
      </>
    );
  }
}

export default SnakeApp;
