class Player {
    constructor(name) {
        this.name = name
        this.turn = true
    }

    setName(name) {
         this.name = name
    }

    getName() {
        return this.name
    }

    changeTurn(player) {
        if (this.turn == true) {
            this.turn = false
            player.startTurn()
        }
    }

    startTurn() {
        if(this.turn == false) {
            this.turn = true
        }
    }

    checkTurn() {
        return this.turn
    }

    playerAttack(x,y,enemy,enemyBoard) {
        if (this.checkTurn() == true) {
            enemyBoard.receiveAttack(x,y);

            this.changeTurn(enemy)
        }
    }
}

module.exports = Player