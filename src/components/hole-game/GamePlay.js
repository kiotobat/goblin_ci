export default class GamePlay {
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

    this.holes = [ ...this.container.children ];
  }

  showGoblin() {
    const holes = [ ...this.holes ];

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