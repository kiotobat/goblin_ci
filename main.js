/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/pic/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// ./src/js/app.js

const containerElements = document.querySelectorAll('.place__container');
const countWinView = document.querySelector('.countWin');
const countOverView = document.querySelector('.countOver');
let num;
const condition = true;
let count = 0;
const arrCount = [];
let countWin = 0;
function handleClick(e) {
  const place = e.target;
  const goblinElement = place.querySelector('img') || place.tagName === 'IMG' ? place : null;
  if (goblinElement) {
    countWin++;
    countWinView.textContent = countWin;
    arrCount[count - 1] = true;
    goblinElement.remove();
    console.log('Kill the goblin');
  } else {
    console.log('you Missing');
    arrCount[count - 1] = false;
    countOverView.textContent = 5 - arrCount.filter(item => item === false).length;
  }
}
const intervalVisible = setInterval(() => {
  while (condition) {
    const random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    if (random !== num) {
      num = random;
      break;
    }
  }
  const img = document.createElement('img');
  img.src = goblin_namespaceObject;
  containerElements[num - 1].append(img);
}, 1000);
const IntervalShow = setInterval(() => {
  arrCount.push(null);
  console.log(arrCount, count);
  if (arrCount[count - 1] === null) {
    arrCount[count - 1] = false;
  }
  containerElements.forEach(item => item.innerHTML = '');
  countOverView.textContent = 5 - arrCount.filter(item => item === false).length;
  if (arrCount.filter(item => item === false).length >= 5) {
    alert('Game over');
    clearInterval(intervalVisible);
    clearInterval(IntervalShow);
  }
  count++;
}, 2000);
containerElements.forEach(item => item.addEventListener('click', handleClick));
;// ./src/index.js


/******/ })()
;