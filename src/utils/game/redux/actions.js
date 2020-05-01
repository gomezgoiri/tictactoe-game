import * as t from "./actionTypes"

const initGame = ({ gameId, player1Id, player2Id, role, whoStarts }) => ({
  type: t.INIT_GAME,
  payload: {
    gameId,
    player1Id,
    player2Id,
    role,
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

const failedLoadGame = () => ({ type: t.LOAD_GAME })

const resetGame = () => ({ type: t.RESET_GAME })

const setGameCreation = () => ({ type: t.CREATING_GAME })

const makeMove = (cellNumber) => ({ type: t.MAKE_MOVE, payload: cellNumber })

export {
  initGame,
  loadGame,
  failedLoadGame,
  resetGame,
  setGameCreation,
  makeMove
}
