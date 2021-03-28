//getting results list from local storage

import { DEFAULT_PLAYERS } from '../constants';

const getResultsList = () => {
  let storageList = localStorage.getItem('playersList');
 
  if (!storageList) {
    return DEFAULT_PLAYERS;
  } else {
    return JSON.parse(storageList);
  }
}

export default getResultsList;