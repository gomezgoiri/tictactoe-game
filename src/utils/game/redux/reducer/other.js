import * as t from "../actionTypes"

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case t.INIT_GAME:
      return { ...state, id: payload.player2Id }

    case t.LOAD_GAME:
      const { me, player1 } = payload
      const otherAsPlayer = me === player1.id ? payload.player2 : player1
      return { ...state, id: otherAsPlayer.id }

    default:
  }
  return state
}

// No need to store the role of the other player
// as it can be inferred from my role

export default reducer
