/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import './style.css';

const Ship = require('./modules/ships.js');
const Player = require('./modules/player.js');
const Ai = require('./modules/ai.js');
const Gameboard = require('./modules/gameboard.js');

// Dom elements
const battleshipElement = document.querySelector('#battleship');
const carrierElement = document.querySelector('#carrier');
const submarineElement = document.querySelector('#submarine');
const destroyerElement = document.querySelector('#destroyer');
const patrolboatElement = document.querySelector('#patrolboat');
const startDisplay = document.querySelector('.start-display');
const gameDisplay = document.querySelector('.game-display');
const shipsDisplay = document.querySelector('.ships');
const randomBtn = document.querySelector('.random-ships');
const resetBtn = document.querySelector('.reset-ships');

const restartBtn = document.querySelector('.restart-main-button');
const helpBtn = document.querySelector('.help-main-button');
const infoBtn = document.querySelector('.tag-main-button');

const playerOneSetBoard = document.getElementById('player-one-set-board');

const playerOneBoard = document.getElementById('player-one-board');
const aiBoardDisplay = document.getElementById('ai-board');

const modalOverlay = document.querySelector('.name-modal-overlay');
const nameInput = document.querySelector('#nameinput');
const submitBtn = document.querySelector('#submitbtn');

const playerNameBoard = document.querySelector('#player-one-name');

const modalWinOverlay = document.querySelector('.win-modal-overlay');
const wintext = document.querySelector('.name-win-text');
const playAgainBtn = document.querySelector('.play-again');

const modalHelp = document.querySelector('.help-modal-overlay');
const modalInfo = document.querySelector('.info-modal-overlay');

const hitStatusPlayer = document.querySelector('#hit-status-player');
const hitStatusAi = document.querySelector('#hit-status-ai');

// Gameboards
const playerBoard = new Gameboard();
const aiBoard = new Gameboard();

// Players
const playerone = new Player('Marta');
const ai = new Ai('Computer', playerone, playerBoard);

// Player ships

const battleship = new Ship(4);
const carrier = new Ship(5);
const submarine = new Ship(3);
const destroyer = new Ship(3);
const patrolBoat = new Ship(2);

// AI ships
const battleshipAi = new Ship(4);
const carrierAi = new Ship(5);
const submarineAi = new Ship(3);
const destroyerAi = new Ship(3);
const patrolBoatAi = new Ship(2);

  function appendGrid(element) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.className = 'grid-item';
        cell.setAttribute('data-x', j);
        cell.setAttribute('data-y', i);
  
        if (element.id == 'player-one-set-board') {
          cell.addEventListener('dragover', (e) => {
            e.preventDefault();
          });
          cell.addEventListener('drop', (e) => {
            e.preventDefault();
            dropShip(e);
          });
        } else if (element.id == 'ai-board') {
          cell.addEventListener('click', (e) => {
            attackEvent(e.target);
            hitEvent(e.target);
          });
        }
        element.appendChild(cell);
      }
    }
  }
  
  function createGrids() {
    appendGrid(playerOneSetBoard);
  }

  function randomShipPlacement(ship, board) {
    while (true) {
      let randomCoords = [];
      const xCoord = Math.floor(Math.random() * 10);
      const yCoord = Math.floor(Math.random() * 10);
      randomCoords = [xCoord, yCoord];
  
      if (board.validateShipPlacement(ship.getShipLength(), randomCoords[0], randomCoords[1])) {
        board.placeShip(ship, randomCoords[0], randomCoords[1]);
        break;
      }
    }
  }
  
  function dragNdrop() {
    dragStart(battleshipElement);
    dragStart(carrierElement);
    dragStart(submarineElement);
    dragStart(destroyerElement);
    dragStart(patrolboatElement);
  }
  
  function dropShip(e) {
    const data = e.dataTransfer.getData('text');
    const x = parseInt(e.target.getAttribute('data-x'), 10);
    const y = parseInt(e.target.getAttribute('data-y'), 10);
    const occupied = e.target.className;
    let ship;
  
    if (data == 'battleship') {
      ship = battleship;
    } else if (data == 'carrier') {
      ship = carrier;
    } else if (data == 'submarine') {
      ship = submarine;
    } else if (data == 'destroyer') {
      ship = destroyer;
    } else if (data == 'patrolboat') {
      ship = patrolBoat;
    }
  
    for (let i = x; i < x + ship.getShipLength(); i++) {
      if (occupied == 'grid-item occupied') {
        return false;
      }
    }
  
    if (playerBoard.validateShipPlacement(ship.getShipLength(), y, x) == true) {
      playerBoard.placeShip(ship, y, x);
      displayShips('player-one-set-board', playerBoard);
      const shipHTML = document.querySelector(`#${data}`);
      shipsDisplay.removeChild(shipHTML);
      if (shipsDisplay.childNodes.length == 0) {
        showStartButton();
      }
    }
  }
  function dragStart(element) {
    element.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });
  }
  
  function attackEvent(e) {
    const x = e.getAttribute('data-x');
    const y = e.getAttribute('data-y');
    playerone.playerAttack(x, y, ai, aiBoard);
  
    displayShips('ai-board', aiBoard);
    if (aiBoard.allShipsSunk()) {
      endGame(playerone.getName());
    }
    ai.aiAttack();
    displayShips('player-one-board', playerBoard);
    if (playerBoard.allShipsSunk()) {
      endGame('Computer');
    }
  }
  
  function displayShips(boardHTML, board) {
    const boardArr = board.getGameboard();
    const missedAttackArr = board.missedAttackArr();
    boardArr.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.shipName) {
          if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipPosition]) == true) {
            const selectedCell = document.querySelector(`#${boardHTML} [data-x="${x}"][data-y="${y}"]`);
            selectedCell.textContent = 'X';
            selectedCell.classList.add('hit');
            selectedCell.classList.remove('occupied');
          } else if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipPosition]) == false) {
            if (boardHTML == 'player-one-set-board' || boardHTML == 'player-one-board') {
              const selectedCell = document.querySelector(`#${boardHTML} [data-x="${x}"][data-y="${y}"]`);
              selectedCell.classList.add('occupied');
            }
          }
        }
      });
    });
  
    missedAttackArr.forEach((e) => {
      const attackedCell = document.querySelector(`#${boardHTML} [data-x="${e.x}"][data-y="${e.y}"]`);
      attackedCell.classList.add('missed');
  
      attackedCell.textContent = 'X';
    });
  }
  
  function highlightHit(object) {
    setTimeout(() => {
      object.classList.remove('active');
    }, 1000);
  }


  function placePlayerFleetRandom() {
    randomShipPlacement(battleship, playerBoard);
    randomShipPlacement(carrier, playerBoard);
    randomShipPlacement(submarine, playerBoard);
    randomShipPlacement(destroyer, playerBoard);
    randomShipPlacement(patrolBoat, playerBoard);
    displayShips('player-one-set-board', playerBoard);
  }
  
  function randomFleetPlacementAi() {
    randomShipPlacement(battleshipAi, aiBoard);
    randomShipPlacement(carrierAi, aiBoard);
    randomShipPlacement(submarineAi, aiBoard);
    randomShipPlacement(destroyerAi, aiBoard);
    randomShipPlacement(patrolBoatAi, aiBoard);
  }
  
  function endGame(name) {
    modalWinOverlay.style.display = 'flex';
  
    wintext.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)} wins!`;
    modalWinOverlay.addEventListener('click', (e) => {
      const clickInside = document.querySelector('.win-modal').contains(e.target);
      if (!clickInside) {
        resetGame();
      }
    });
  }
  
  function startGame() {
    domElements();
    createGrids();
    dragNdrop();
    randomFleetPlacementAi();
  }
  
  function resetFleet() {
    shipsDisplay.innerHTML = '';
    playerBoard.gameboardArray = undefined;
    playerBoard.missedAttacks = [];
    playerBoard.gameboardArray = playerBoard.createGameboard();
    playerOneSetBoard.innerHTML = '';
    appendGrid(playerOneSetBoard);
    displayShips('player-one-set-board', playerBoard);
  }
  
  function resetGame() {
    window.location.reload();
  }
  
  function showStartButton() {
    document.querySelector('.ships-text').innerHTML = `<div class="start-game">START</div>`;
    const startgameBtn = document.querySelector('.start-game');
    startgameBtn.addEventListener('click', () => {
      playRound();
    });
  }
  
  function showRestartButton() {
    restartBtn.style.display = 'inline';
  }
  
  function playRound() {
    hideStartScreen();
    showRestartButton();
    showGameboards();
  }
  
  function hideStartScreen() {
    startDisplay.style.display = 'none';
    gameDisplay.style.display = 'flex';
  }
  
  function showGameboards() {
    appendGrid(playerOneBoard);
    displayShips('player-one-board', playerBoard);
    appendGrid(aiBoardDisplay);
  }
  
  function domElements() {
    randomBtn.addEventListener('click', () => {
      resetFleet();
      placePlayerFleetRandom();
      showStartButton();
    });
  
    resetBtn.addEventListener('click', () => {
      resetFleet();
      resetGame();
    });
  
    restartBtn.addEventListener('click', () => {
      resetGame();
    });
  
    infoBtn.addEventListener('click', () => {
      modalInfo.style.display = 'flex';
    });
  
    modalInfo.addEventListener('click', (e) => {
      const clickInside = document.querySelector('.info-modal').contains(e.target);
      if (!clickInside) {
        modalInfo.style.display = 'none';
      }
    });
  
    helpBtn.addEventListener('click', () => {
      modalHelp.style.display = 'flex';
    });
    modalHelp.addEventListener('click', (e) => {
      const clickInside = document.querySelector('.help-modal').contains(e.target);
      if (!clickInside) {
        modalHelp.style.display = 'none';
      }
    });
  
    submitBtn.addEventListener('click', () => {
      setPlayerName(nameInput.value);
      modalOverlay.style.display = 'none';
    });
  
    modalOverlay.addEventListener('click', (e) => {
      const clickInside = document.querySelector('.name-modal').contains(e.target);
      if (!clickInside) {
        setPlayerName(nameInput.value);
        modalOverlay.style.display = 'none';
      }
    });
  
    playAgainBtn.addEventListener('click', () => {
      resetGame();
    });
  }
  
  function setPlayerName(value) {
    if (value == '' || undefined || null) {
      const name = 'Player';
      playerone.setName(name);
      const nameUpper = name.toUpperCase();
      playerNameBoard.textContent = `${nameUpper}`;
    } else {
      const name = value;
      playerone.setName(name);
      const nameUpper = name.toUpperCase();
      playerNameBoard.textContent = `${nameUpper}`;
    }
  }
  
  function hitEvent(e) {
    let missedAttackArrLast;
    let attackArrLast;
    if (e.className == 'grid-item hit') {
      hitStatusAi.classList.add('active');
      highlightHit(hitStatusAi);
    }
  
    if (ai.getAttackArr().length > 1) {
      attackArrLast = ai.getAttackArr().slice(-1);
    } else {
      attackArrLast = ai.getAttackArr();
    }
  
    if (playerBoard.missedAttackArr().length > 1) {
      missedAttackArrLast = playerBoard.missedAttackArr().slice(-1);
    } else {
      missedAttackArrLast = playerBoard.missedAttackArr();
    }
  
    const arr1 = JSON.stringify(missedAttackArrLast[0]);
    const arr2 = JSON.stringify(attackArrLast[0]);
  
    if (arr1 != arr2) {
      hitStatusPlayer.classList.add('active');
      highlightHit(hitStatusPlayer);
    }
  }

startGame();


