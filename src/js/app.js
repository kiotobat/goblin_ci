import goblin from '../pic/goblin.png'
const containerElements = document.querySelectorAll('.place__container')
const countWinView = document.querySelector('.countWin')
const countOverView = document.querySelector('.countOver')

// Модальное окно
const modal = document.createElement('div')
modal.className = 'modal hidden'
modal.innerHTML = '<div class="modal__content"><span class="modal__text"></span><button class="modal__btn">OK</button></div>'
document.body.appendChild(modal)
const modalText = modal.querySelector('.modal__text')
const modalBtn = modal.querySelector('.modal__btn')
modalBtn.onclick = () => { modal.classList.add('hidden') }

let prevGoblinIndex = null
let goblinIndex = null
let countWin = 0
let countMiss = 0
let gameOver = false

function showModal(text) {
  modalText.textContent = text
  modal.classList.remove('hidden')
}

function clearField() {
  containerElements.forEach(item => item.innerHTML = '')
}

function getRandomIndex(exclude) {
  let idx
  do {
    idx = Math.floor(Math.random() * containerElements.length)
  } while (idx === exclude)
  return idx
}

function nextTurn() {
  clearField()
  if (goblinIndex !== null && !gameOver) {
    // Если гоблин не был пойман — это промах
    countMiss++
    countOverView.textContent = 5 - countMiss
    if (countMiss >= 5) {
      showModal('Game over')
      clearInterval(gameInterval)
      gameOver = true
      return
    }
  }
  goblinIndex = getRandomIndex(prevGoblinIndex)
  prevGoblinIndex = goblinIndex
  const img = document.createElement('img')
  img.src = goblin
  img.style.pointerEvents = 'none'
  containerElements[goblinIndex].append(img)
}

function handleClick(e) {
  if (gameOver) return
  const idx = Array.from(containerElements).indexOf(e.currentTarget)
  if (idx === goblinIndex) {
    countWin++
    countWinView.textContent = countWin
    goblinIndex = null
    e.currentTarget.innerHTML = ''
  } else {
    countMiss++
    countOverView.textContent = 5 - countMiss
    if (countMiss >= 5) {
      showModal('Game over')
      clearInterval(gameInterval)
      gameOver = true
    }
  }
}

containerElements.forEach(item => item.addEventListener('click', handleClick))

const gameInterval = setInterval(nextTurn, 1000)
