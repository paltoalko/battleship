const Ship = require('./ships.js')



describe ("ship", () => {
    const lenght = 2
    const smallShip = new Ship(lenght)
    test('creates ship with lenght of 2', () => {
        expect(smallShip.length).toBe(2)
    })

    test('creates ship with hit property, that equals false', () => {
        const falseHit = [{hit: false},{hit: false}]

        expect(smallShip.ship).toEqual(falseHit)
    })

    test('checks if the ship was hit on position 2', () => {
        const admiral = new Ship(3);
        admiral.hit(2)

        expect(admiral.getShip()[2]).toEqual({"hit": true})
    })

    test('checks if the ship is sunk', () => {
        const admiral = new Ship(3)

        admiral.hit(0)
        admiral.hit(1)
        admiral.hit(2)

        expect(admiral.checkSunk()).toBe(true)
    })

    test('checks if the ship is sunk with 2 right hits, 1 false', () => {
        const admiral = new Ship(3)
        admiral.hit(0)
        admiral.hit(1)

        expect(admiral.checkSunk()).toBe(false)
    })
})