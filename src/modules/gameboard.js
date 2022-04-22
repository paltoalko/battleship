class Gameboard {
    constructor () {
        this.gameboardArray = this.createGameboard();
        this.missedAttacks = []
    }

    createGameboard () {
        let gameboardArr = []
        let gameboardArrItem = []
        for (let i = 0; i<10; i++){
            for (let j=0; j<10;j++) {
                gameboardArrItem.push({shipName: undefined, shipPosition: undefined})
            }
          gameboardArr.push(gameboardArrItem)
          gameboardArrItem = []  
        }
        return gameboardArr
    }

    getGameboard() {
        return this.gameboardArray
    }

    validateShipPlacement(length,x,y) {
        if (x > 10 || x < 0 || y > 10 || y < 0 || y + length > 10) {
            return false
        } else {
            for (let i = y; i < y + length; i++) {
              if (this.gameboardArray[x][i].shipName != undefined) {
                return false;
              } 
            }
            return true;
      }
    }

    placeShip (ship, x ,y) {
        if (this.validateShipPlacement(ship.getShipLength(), x, y)) {
            for (let i = 0; i < ship.getShipLength(); i++) {
                this.gameboardArray[x][y + i].shipName = ship;
                this.gameboardArray[x][y + i].shipPosition = i;
            }
        }
    }

    receiveAttack (x,y) {
        if(this.gameboardArray[x][y].shipName == undefined) {
            this.missedAttacks.push({x: x, y: y})
        } else {
            this.gameboardArray[x][y].shipName.hit(
                this.gameboardArray[x][y].shipPosition
            )
        }
    }

    missedAttackArr () {
        return this.missedAttacks
    }

    allShipsSunk() {
        let sunk = false
        this.gameboardArray.forEach((item) => {
            item.forEach((element) => {
                if(element.shipName) {
                    if (element.shipName.checkSunk() == false) {
                        sunk = true;
                    }
                }
            })
        })
        return sunk
    }
    
}

module.exports = Gameboard 