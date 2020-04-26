import * as t from "../actionTypes"
import me from "./me"
import other from "./other"
import { otherRole } from "../../roles"

const initialState = {
  loading: true,
  gameId: null,
  me: {
    id: null,
    role: null
  },
  other: {
    id: null
  },
  table: new Array(9).fill(null),
  turn: null
}

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case t.INIT_GAME:
      return {
        ...state,
        loading: false,
        gameId: payload.gameId,
        turn: payload.whoStarts,
        me: me(state.me, action),
        other: other(state.other, action)
      }

    case t.LOAD_GAME:
      return {
        ...state,
        loading: false,
        gameId: payload.gameId,
        turn: payload.turn,
        table: payload.table,
        me: me(state.me, action),
        other: other(state.other, action)
      }

    case t.RESET_GAME:
      return { ...state, table: new Array(9).fill(null) }

    case t.CREATING_GAME:
      return { ...state, loading: false }

    case t.MAKE_MOVE:
      if (isMyTurn(state)) {
        return {
          ...state,
          turn: otherRole(state.turn),
          table: state.table.map((v, k) =>
            k === payload ? getMyRole(state) : v
          )
        }
      }
      break

    case t.MOVEMENT_MADE:
      const { role, cellNumber } = payload
      if (getMyRole(state) !== role) {
        // Other player moved
        return {
          ...state,
          turn: otherRole(state.turn),
          table: state.table.map((v, k) => (k === cellNumber ? role : v))
        }
      }
      break

    default:
  }
  return state
}

const isLoading = (state) => state.loading

const isAlreadyLoaded = (state, gameId, playerId) =>
  state.gameId === gameId && state.me.id === playerId

const isOtherPlayerReady = (state) => state.other.name !== undefined

const getOtherPlayerHash = (state) => {
  const { other } = state
  if (other.id && !isOtherPlayerReady(state)) {
    return `${state.gameId}.${other.id}`
  }
}

const getMyRole = (state) => state.me.role

const isMyTurn = (state) => state.turn === getMyRole(state)

const WIN_POSITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const getWinnerLine = (state) => {
  const { table: t } = state
  return WIN_POSITIONS.find((r) => r.every((v) => t[r[0]] === t[v]))
}

const getWinner = (state) => {
  const won = getWinnerLine(state)
  return won ? state.table[won[0]] : null
}

const isFinished = (state) =>
  // not null cells or a winner
  getWinner(state) !== null || state.table.every((v) => v !== null)

const selectors = {
  isLoading,
  isAlreadyLoaded,
  getOtherPlayerHash,
  getMyRole,
  isMyTurn,
  getWinnerLine,
  getWinner,
  isFinished
}

export { reducer, initialState, selectors }
