const Player = require('./player.js')
const Gameboard = require('./gameboard.js')
const Ship = require('./ships.js')
const Ai = require('./ai.js')



describe("Ai", () => {
    test("Ai has a name and doesnt start", () => {
        const computer = new Ai("Computer")

        expect(computer.getName()).toBe('Computer')
        expect(computer.checkTurn()).toBe(false)
    })

    test("Ai attacks when it's turn", () => {
        const player1 = new Player("Zuzia")
        const enemyBoard = new Gameboard()
        const computer = new Ai("computer",player1,enemyBoard)
        
        player1.changeTurn(computer)
        computer.aiAttack()

        expect(enemyBoard.missedAttackArr().length).toBe(1)


    })

})