/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
class Ship {
  constructor(length) {
    this.length = length;
    this.ship = this.createShip();
  }

  createShip() {
    const shipArr = [];
    let i = this.length;
    while (i > 0) {
      shipArr.push({ hit: false });
      i--;
    }
    return shipArr;
  }

  getShip() {
    return this.ship;
  }

  getShipLength() {
    return this.ship.length;
  }

  hit(index) {
    this.ship[index].hit = true;
  }

  checkHit(number) {
    if (number.hit == false) {
      return false;
    }
    if (number.hit == true) {
      return true;
    }
  }

  checkSunk() {
    if (this.ship.every(this.checkHit)) {
      return true;
    }
    return false;
  }
}

module.exports = Ship;
