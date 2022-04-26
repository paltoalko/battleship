/* eslint-disable import/extensions */
/* eslint-disable no-undef */
const Gameboard = require('./gameboard.js');
const Ship = require('./ships.js');

describe('gameboard', () => {
  test('creates gameboard with lenght of arr 10', () => {
    const board = new Gameboard();

    expect(board.getGameboard().length).toBe(10);
    expect(board.getGameboard()[0].length).toBe(10);
  });

  test('checks if array has proper objects', () => {
    const board = new Gameboard();
    const object = { shipName: undefined, shipPosition: undefined };

    expect(board.getGameboard()[9][9]).toEqual(object);
  });
  test('checks if placement validation works', () => {
    const board = new Gameboard();
    const placement = board.validateShipPlacement(10, 10, 10);

    expect(placement).toBe(false);
  });

  test('checks if placement is possible', () => {
    const board = new Gameboard();
    const smallShip = new Ship(2);
    let x = 1;
    let y = 2;
    board.placeShip(smallShip, x, y);

    expect(board.getGameboard()[1][2]).toEqual({
      shipName: smallShip,
      shipPosition: 0,
    });

    expect(board.getGameboard()[1][3]).toEqual({
      shipName: smallShip,
      shipPosition: 1,
    });
  });

  test('places ships only inside the grid', () => {
    const board = new Gameboard();
    const smallShip = new Ship(2);

    let x = 1;
    let y = 8;
    board.placeShip(smallShip, x, y);
    expect(board.getGameboard()[8][1]).toEqual({
      shipName: undefined,
      shipPosition: undefined,
    });
  });

  test('does not place 2 ships at same position', () => {
    const board = new Gameboard();
    const smallShip = new Ship(2);
    const admiral = new Ship(3);

    board.placeShip(smallShip, 2, 2);
    board.placeShip(admiral, 2, 2);

    expect(board.getGameboard()[2][2]).toEqual({
      shipName: smallShip,
      shipPosition: 0,
    });

    expect(board.getGameboard()[2][3]).toEqual({
      shipName: smallShip,
      shipPosition: 1,
    });

    expect(board.getGameboard()[2][4]).toEqual({
      shipName: undefined,
      shipPosition: undefined,
    });
  });

  test('ships can be hit', () => {
    const board = new Gameboard();
    const smallShip = new Ship(2);

    board.placeShip(smallShip, 1, 1);
    board.receiveAttack(1, 2);

    expect(smallShip.getShip()[1].hit).toBe(true);
    expect(smallShip.getShip()[0].hit).toBe(false);
  });

  test('report missed attacks', () => {
    const board = new Gameboard();

    board.receiveAttack(1, 3);
    board.receiveAttack(2, 3);

    expect(board.missedAttackArr()[0]).toEqual({
      x: 1,
      y: 3,
    });
    expect(board.missedAttackArr()[1]).toEqual({
      x: 2,
      y: 3,
    });
  });

  test('all ships are sunk', () => {
    const board = new Gameboard();
    const smallShip = new Ship(2);
    const admiral = new Ship(3);

    board.placeShip(smallShip, 1, 1);
    board.placeShip(admiral, 5, 5);

    board.receiveAttack(1, 2);
    board.receiveAttack(1, 3);

    board.receiveAttack(5, 5);
    board.receiveAttack(5, 6);
    board.receiveAttack(5, 7);

    expect(board.allShipsSunk()).toBe(true);
  });
});
