import * as t from "../actionTypes"
import { otherRole } from "../../roles"

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case t.INIT_GAME:
      return {
        ...state,
        id: payload.player1Id,
        role: payload.role
      }

    case t.LOAD_GAME:
      const { me, player1 } = payload
      const meAsPlayer = me === player1.id ? player1 : payload.player2
      const role = meAsPlayer.role || otherRole(payload.player1.role) // Might be undefined
      return { ...state, id: meAsPlayer.id, role }

    default:
  }
  return state
}

export default reducer
