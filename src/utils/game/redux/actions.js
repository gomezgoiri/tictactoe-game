import * as t from "./actionTypes"

const initGame = ({ gameId, player1Id, player2Id, role, name, whoStarts }) => ({
  type: t.INIT_GAME,
  payload: {
    gameId,
    player1Id,
    player2Id,
    role,
    name,
    whoStarts
  }
})

const loadGame = ({ gameId, turn, player1, player2, me, table }) => ({
  type: t.LOAD_GAME,
  payload: {
    gameId,
    turn,
    player1,
    player2,
    me,
    table
  }
})

const resetGame = () => ({ type: t.RESET_GAME })

const setGameCreation = () => ({ type: t.CREATING_GAME })

const makeMove = (cellNumber) => ({ type: t.MAKE_MOVE, payload: cellNumber })

// Movement notified
const movementMade = (role, cellNumber) => ({
  type: t.MOVEMENT_MADE,
  payload: { role, cellNumber }
})

export {
  initGame,
  loadGame,
  resetGame,
  setGameCreation,
  makeMove,
  movementMade
}
