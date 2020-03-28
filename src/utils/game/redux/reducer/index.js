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
        me: me(state.me, action),
        other: other(state.other, action)
      }

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

    default:
  }
  return state
}

const isLoading = state => state.loading

const isAlreadyLoaded = (state, gameId, playerId) =>
  state.gameId === gameId && state.me.id === playerId

const isOtherPlayerReady = state => state.other.name !== undefined

const getOtherPlayerHash = state => {
  const { other } = state
  if (other.id && !isOtherPlayerReady(state)) {
    return `${state.gameId}.${other.id}`
  }
}

const getMyRole = state => state.me.role

const isMyTurn = state => state.turn === getMyRole(state)

const selectors = {
  isLoading,
  isAlreadyLoaded,
  getOtherPlayerHash,
  getMyRole,
  isMyTurn
}

export { reducer, initialState, selectors }
