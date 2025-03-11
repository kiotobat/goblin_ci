// TODO: write code here

import GamePlay from '../components/hole-game/GamePlay';
import GameController from '../components/hole-game/GameController';

document.addEventListener('DOMContentLoaded', () => {
  const gamePlay = new GamePlay(document.querySelector('.hole-game__container'));
  const gameCtrl = new GameController( gamePlay );
  gameCtrl.init();
});