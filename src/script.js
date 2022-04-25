import './style.css';
const Ship = require('./modules/ships.js')
const Player = require('./modules/player.js')
const Ai = require('./modules/ai.js')
const Gameboard = require('./modules/gameboard.js')

console.log("hell it works");

//Dom elements
const battleshipElement = document.querySelector("#battleship");
const carrierElement = document.querySelector("#carrier");
const submarineElement = document.querySelector("#submarine");
const destroyerElement = document.querySelector("#destroyer");
const patrolboatElement = document.querySelector("#patrolboat");
const startDisplay = document.querySelector('.start-display')
const gameDisplay = document.querySelector('.game-display')
const shipsDisplay = document.querySelector(".ships")
const randomBtn = document.querySelector(".random-ships")
const resetBtn = document.querySelector(".reset-ships")

const restartBtn = document.querySelector(".restart-main-button")
const helpBtn = document.querySelector(".help-main-button")
const infoBtn = document.querySelector(".tag-main-button")

const playerOneSetBoard =document.getElementById("player-one-set-board")

const playerOneBoard = document.getElementById("player-one-board")
const aiBoardDisplay = document.getElementById("ai-board")

  // Gameboards
  const playerBoard = new Gameboard()
  const aiBoard = new Gameboard()

  // Players
  const playerone = new Player("Marta")
  const ai = new Ai("Ai",playerone,playerBoard)  


  // Player ships

  const battleship = new Ship(4)
  const carrier = new Ship(5)
  const submarine = new Ship(3)
  const destroyer = new Ship(3)
  const patrolBoat = new Ship(2)
 
  // AI ships
  const battleshipAi = new Ship(4)
  const carrierAi = new Ship(5)
  const submarineAi = new Ship(3)
  const destroyerAi = new Ship(3)
  const patrolBoatAi = new Ship(2)

 // Create grids
function createGrids () {
    appendGrid(playerOneSetBoard)
}

function appendGrid (element) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
        let cell = document.createElement('div')
        cell.className = "grid-item"
          cell.setAttribute("data-x", j);
          cell.setAttribute("data-y", i);
          
          
          if(element.id == "player-one-set-board") {
            
              
              cell.addEventListener("dragover", (e) => {
                  e.preventDefault()
              })
              cell.addEventListener("drop", (e) => {
                  e.preventDefault()
                  dropShip(e)
              })

              cell.addEventListener("click", () => {
                  console.log(cell);
                  
              })
          } else if (element.id == "ai-board") {
              cell.addEventListener("click", (e) => {
                  attackEvent(e.target)
              })
          }
          element.appendChild(cell);
    }} 
    
}



function randomShipPlacement(ship,board) {
    while(true) {
        let randomCoords = []
        let  xCoord = Math.floor(Math.random() * 10);
        let  yCoord = Math.floor(Math.random() * 10);
        randomCoords = [xCoord,yCoord] 

        if (board.validateShipPlacement(ship.getShipLength(),
        randomCoords[0],randomCoords[1])) {
            board.placeShip(ship,randomCoords[0],randomCoords[1])
            break
        }
    }
    
}

function dragNdrop () {
    dragStart(battleshipElement);
    dragStart(carrierElement);
    dragStart(submarineElement);
    dragStart(destroyerElement);
    dragStart(patrolboatElement);
}

function dropShip (e) {
    let data = e.dataTransfer.getData("text")
    let x = parseInt(e.target.getAttribute("data-x"));
    let y = parseInt(e.target.getAttribute("data-y"));
    let occupied = e.target.className
    let ship;
    console.log(e)
    

    if (data == "battleship") {
        ship = battleship
    } else if (data == "carrier") {
        ship = carrier
    } else if (data == "submarine") {
        ship = submarine
    } else if (data == "destroyer") {
        ship = destroyer
        
    } else if (data == "patrolboat") {
        ship = patrolBoat 
    }
    
    for (let i = x;i < x + ship.getShipLength();i++) {
       if (occupied == "grid-item occupied") {
           return false
       }
       
    }

    if (playerBoard.validateShipPlacement(ship.getShipLength(),y,x) == true) {
        playerBoard.placeShip(ship,y,x)
        console.log(shipsDisplay.childNodes.length);
        
        displayShips("player-one-set-board", playerBoard)
        let shipHTML = document.querySelector(`#${data}`)
        shipsDisplay.removeChild(shipHTML)
        if (shipsDisplay.childNodes.length == 0) {
            showStartButton()
            
        }

    }
}

function dragStart (element) {
    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/plain",e.target.id)
        console.log(e.target.id);
    })
}

function attackEvent(e) {
    let x = e.getAttribute("data-x");
    let y = e.getAttribute("data-y");
    playerone.playerAttack(x,y,ai,aiBoard)
    
    displayShips("ai-board",aiBoard)
    if(aiBoard.allShipsSunk()) {
        endGame(playerone.getName())
    }
    ai.aiAttack()
    displayShips("player-one-board", playerBoard)
    if (playerBoard.allShipsSunk()) {
        endGame(ai)
    }
}

function displayShips (boardHTML,board) {
    let boardArr = board.getGameboard()
    let missedAttackArr = board.missedAttackArr()
        boardArr.forEach((row,y) => {
            row.forEach((cell,x) => { 
                if (cell.shipName) {
                    if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipPosition]) == true) {
                        let selectedCell = document.querySelector(`#${boardHTML} [data-x="${x}"][data-y="${y}"]`)
                        selectedCell.textContent = "X"
                        selectedCell.classList.add("hit")
                        selectedCell.classList.remove("occupied")
                        
                    } else if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipPosition]) == false) {
                        if (boardHTML == "player-one-set-board" || boardHTML == "player-one-board" || boardHTML == "ai-board") {
                            let selectedCell = document.querySelector(`#${boardHTML} [data-x="${x}"][data-y="${y}"]`)
                            selectedCell.classList.add("occupied")
                                
                        }
                    }
                }
            })
        })

        missedAttackArr.forEach((e) => {
            let attackedCell = document.querySelector(`#${boardHTML} [data-x="${e.x}"][data-y="${e.y}"]`)
            attackedCell.classList.add("missed")

            
            attackedCell.textContent = "X"
        })
}


function placePlayerFleetRandom() {
    randomShipPlacement(battleship,playerBoard)
    randomShipPlacement(carrier,playerBoard)
    randomShipPlacement(submarine,playerBoard)
    randomShipPlacement(destroyer,playerBoard)
    randomShipPlacement(patrolBoat,playerBoard)
    displayShips("player-one-set-board",playerBoard)
}

function randomFleetPlacementAi() {
    randomShipPlacement(battleshipAi,aiBoard)
    randomShipPlacement(carrierAi,aiBoard)
    randomShipPlacement(submarineAi,aiBoard)
    randomShipPlacement(destroyerAi,aiBoard)
    randomShipPlacement(patrolBoatAi,aiBoard)
}

function endGame(name) {
    console.log(`${name} wins!`);
    
}

function startGame() {
    domElements()
    createGrids();
    dragNdrop();
    randomFleetPlacementAi();

}

function resetFleet() {
    shipsDisplay.innerHTML = ''
    playerBoard.gameboardArray = undefined
    playerBoard.missedAttacks = []
    playerBoard.gameboardArray = playerBoard.createGameboard()
    playerOneSetBoard.innerHTML = ''
    appendGrid(playerOneSetBoard)
    displayShips("player-one-set-board",playerBoard)
}

function fixReset () {
    window.location.reload()
}

function showStartButton () {
    document.querySelector('.ships-text').innerHTML = `<div class="start-game">START</div>`
    const startgameBtn = document.querySelector(".start-game")
    startgameBtn.addEventListener("click", () => {
        playRound();
    });
    
}

function showRestartButton() {
    restartBtn.style.display = "flex"
}

function playRound () {
    hideStartScreen()
    showRestartButton()
    showGameboards()
}

function hideStartScreen () {
    startDisplay.style.display = 'none'
    gameDisplay.style.display = 'flex'
}

function showGameboards() {
    appendGrid(playerOneBoard)
    displayShips("player-one-board",playerBoard)

    appendGrid(aiBoardDisplay)
}

function domElements () {
    randomBtn.addEventListener("click", () => {
        resetFleet()
        placePlayerFleetRandom()
        showStartButton()
    })

    resetBtn.addEventListener("click", () => {
        resetFleet()
        fixReset()
    })

    
    



}





startGame();


