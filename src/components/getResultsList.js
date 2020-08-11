//getting results list from local storage

import { DEFAULT_PLAYERS } from '../constants';

const getResultsList = () => {
  let resultsList = null;

  if(!localStorage.getItem('playersList')){
      resultsList = DEFAULT_PLAYERS;
  }else{
      resultsList = JSON.parse(localStorage.getItem('playersList'));
  }

  return resultsList;
}

export default getResultsList;