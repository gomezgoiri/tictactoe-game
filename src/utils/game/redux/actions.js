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

const loadGame = ({ gameId, turn, player1, player2, me }) => ({
  type: t.LOAD_GAME,
  payload: {
    gameId,
    turn,
    player1,
    player2,
    me
  }
})

const setGameCreation = () => ({ type: t.CREATING_GAME })

const makeMove = cellNumber => ({ type: t.MAKE_MOVE, payload: cellNumber })

export { initGame, loadGame, setGameCreation, makeMove }
