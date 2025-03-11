import './hole-game.css';

export default class GameController {
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