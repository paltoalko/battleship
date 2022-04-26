/* eslint-disable no-constant-condition */
/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
const Player = require('./player.js');

class Ai extends Player {
  constructor(name, enemy, enemyBoard) {
    super(name, enemyBoard);
    this.turn = false;
    this.enemy = enemy;
    this.enemyBoard = enemyBoard;
    this.attackArray = [];
  }

  aiAttack() {
    if (this.checkTurn() == true) {
      const attackCoords = { x: undefined, y: undefined };

      while (true) {
        const xCoord = Math.floor(Math.random() * 10);
        const yCoord = Math.floor(Math.random() * 10);

        attackCoords.x = xCoord;
        attackCoords.y = yCoord;

        if (!this.attackArray.some((e) => e.x == attackCoords.x && e.y == attackCoords.y)) {
          this.attackArray.push(attackCoords);
          this.playerAttack(attackCoords.x, attackCoords.y, this.enemy, this.enemyBoard);
          break;
        }
      }
    }
  }

  getAttackArr() {
    return this.attackArray;
  }
}

module.exports = Ai;
