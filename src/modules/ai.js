const Player = require('./player.js');


class Ai extends Player {
    constructor(name, enemy, enemyBoard){
        super(name,enemyBoard);
        this.turn = false;
        this.enemy = enemy;
        this.enemyBoard = enemyBoard;
        this.attackArray = []
    }

    aiAttack () {
        if (this.checkTurn()  == true){
            let attackCoords = {x: undefined,y:undefined}

            while(true){
              
                let xCoord =  Math.floor((Math.random() * 10))
                let yCoord =  Math.floor((Math.random() * 10))

                attackCoords.x = xCoord
                attackCoords.y = yCoord


                // don't shot twice the same pos

                if(!(this.attackArray.some(e => e.x == attackCoords.x && e.y == attackCoords.y))){
                    
                    this.attackArray.push(attackCoords)
                    this.playerAttack(attackCoords.x,attackCoords.y,this.enemy,this.enemyBoard)
                    break
                }
            }


        }
    }

    getAttackArr() {
        return this.attackArray
    }
}

module.exports = Ai