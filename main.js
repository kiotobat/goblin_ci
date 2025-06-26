/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/components/hole-game/GamePlay.js
class GamePlay {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Parameter `container` is not an HTMLElement');
    }
    this.container = container;
    this.boardSize = 4;
    this.maximumNumberOfMisses = 5;
    this.holes = [];
    this.holeWhereGoblinWas = null;
    this.wasThereHitOnGoblin = false;
    this.loss = document.querySelector('.hole-game__loss');
    this.hits = document.querySelector('.hole-game-hits span');
    this.misses = document.querySelector('.hole-game-misses span');
    this.onHoleClick = this.onHoleClick.bind(this);
    this.container.addEventListener('click', this.onHoleClick);
  }
  drawUi() {
    for (let i = 0; i < this.boardSize ** 2; i++) {
      const hole = document.createElement('div');
      hole.classList.add('hole');
      this.container.append(hole);
    }
    this.holes = [...this.container.children];
  }
  showGoblin() {
    const holes = [...this.holes];
    if (this.holeWhereGoblinWas) holes.splice(holes.indexOf(this.holeWhereGoblinWas), 1);
    const index = Math.floor(Math.random() * holes.length);
    holes[index].classList.add('hole_with-goblin');
  }
  hideGoblin() {
    const holeWithGoblin = this.container.querySelector('.hole_with-goblin');
    if (!holeWithGoblin) return;
    if (this.wasThereHitOnGoblin === false) this.misses.textContent++;
    holeWithGoblin.classList.remove('hole_with-goblin');
    this.holeWhereGoblinWas = holeWithGoblin;
    this.wasThereHitOnGoblin = false;
  }
  onHoleClick(event) {
    const target = event.target;
    if (target.classList.contains('hole_with-goblin')) {
      this.hits.textContent++;
      this.wasThereHitOnGoblin = true;
    }
  }
}
;// ./src/components/hole-game/GameController.js

class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.idInterval = null;
  }
  init() {
    this.gamePlay.drawUi();
    this.start();
  }
  start() {
    this.idInterval = setInterval(() => {
      this.gamePlay.showGoblin();
      setTimeout(() => {
        this.gamePlay.hideGoblin();
        this.actionsAfterLoss();
      }, 1000);
    }, 2000);
  }
  stop() {
    clearInterval(this.idInterval);
  }
  actionsAfterLoss() {
    if (Number(this.gamePlay.misses.textContent) !== this.gamePlay.maximumNumberOfMisses) return;
    this.stop();
    this.gamePlay.container.classList.toggle('hidden');
    this.gamePlay.loss.classList.toggle('hidden');
    setTimeout(() => {
      this.gamePlay.container.classList.toggle('hidden');
      this.gamePlay.loss.classList.toggle('hidden');
      this.gamePlay.hits.textContent = 0;
      this.gamePlay.misses.textContent = 0;
      this.start();
    }, 2000);
  }
}
;// ./src/js/app.js
// TODO: write code here



document.addEventListener('DOMContentLoaded', () => {
  const gamePlay = new GamePlay(document.querySelector('.hole-game__container'));
  const gameCtrl = new GameController(gamePlay);
  gameCtrl.init();
});
;// ./src/index.js



// TODO: write your code in app.js
/******/ })()
;