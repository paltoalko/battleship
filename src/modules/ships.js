class Ship {
    constructor(length) {
        this.length = length
        this.ship = this.createShip() 

    }

    createShip() {
        let shipArr = []
        let i = this.length
        while (i > 0) {
            shipArr.push({ hit: false })
            i--
        }
        return shipArr
    }

    getShip() {
        return this.ship;
    }

    getShipLength() {
        return this.ship.length
    }

    hit(index) {
        this.ship[index].hit = true;
    }

    checkHit (number) {
        if (number.hit == false) {
            return false
        } else if (number.hit == true) {
            return true
        }
    }

    checkSunk() {
        if (this.ship.every(this.checkHit)) {
            return true;
          } else {
            return false;
        }

    }    

}

module.exports = Ship