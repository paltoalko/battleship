// Create grids
function createGrids () {
    const playerOneGrid = document.getElementById("player-one-board")
    const playerTwoGrid = document.getElementById("player-two-board")

    
    appendGrid(playerOneGrid);
    appendGrid(playerTwoGrid);


}

function appendGrid (element) {
    for (let c = 0; c < (10*10); c++) {
        let cell = document.createElement('div')
        cell.innerText = (c + 1)
        cell.className = "grid-item"
        element.appendChild(cell);
    } 
}

export { createGrids }
