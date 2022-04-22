const Player = require('./player.js')
const Gameboard = require('./gameboard.js')
const Ship = require('./ships.js')

describe("Player", () => {
    test("Player has a name", () =>{
        const player = new Player("zuzia")
        
        expect(player.getName()).toBe("zuzia")
    })

    test("Name can be changed",() => {
        const player = new Player("Zuzia")

        player.setName("Marta")

        expect(player.getName()).toBe("Marta")
    })

    test("Player 1 has turn, player 2 doesn't", () => {
        const player1 = new Player("Zuzia")
        const player2 = new Player("Marta")

        player2.changeTurn(player1)

        expect(player1.checkTurn()).toBe(true)
        expect(player2.checkTurn()).toBe(false)

    })

    test("Player can only attack when it's their turn", () => {
        const enemyBoard = new Gameboard()
        const playerBoard = new Gameboard()
        const playerShip = new Ship(1)
        const smallShip = new Ship(1)
        const player1 = new Player("Zuzia")
        const player2 = new Player("Marta")

        player2.changeTurn(player1)

        playerBoard.placeShip(playerShip,1,1)
        player2.playerAttack(1,1,player1,playerBoard)

        enemyBoard.placeShip(smallShip,1,1)
        player1.playerAttack(1,1,player2,enemyBoard)


        expect(smallShip.getShip()[0].hit).toBe(true)
        expect(playerShip.getShip()[0].hit).toBe(false)

    })

    test("Turn changes after attack", () => {
        const enemyBoard = new Gameboard()
        const smallShip = new Ship(1)
        const player1 = new Player("Zuzia")
        const player2 = new Player("Marta")

        enemyBoard.placeShip(smallShip,1,1)
        player1.playerAttack(1,1,player2,enemyBoard)

        expect(player1.checkTurn()).toBe(false)
        expect(player2.checkTurn()).toBe(true)

    })
})