import React, { useState, useEffect } from "react"
import { useReducer } from "reinspect"

import shortid from "shortid"

import initIpfs from "utils/ipfs"
import { reducer, initialState, actions, selectors } from "utils/game"

const Context = React.createContext()

const getHashValue = () => {
  const { hash } = window.location
  return hash ? hash.substr(1) : hash
}

const parseHash = () => {
  const [gameId = null, playerId = null, peerId = null] = getHashValue().split(
    "."
  )
  return { gameId, playerId, peerId }
}

const PersistenceProvider = ({ children }) => {
  const [db, setDatabase] = useState()
  const [notif, setNotifications] = useState()
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    undefined,
    "tictactoe"
  )

  useEffect(() => {
    const initComms = async () => {
      const { database, notifications } = await initIpfs()
      setNotifications(notifications)
      setDatabase(database)
    }

    const { gameId, playerId } = parseHash()
    if (!gameId && !playerId) {
      dispatch(actions.setGameCreation())
    }
    initComms()
  }, [])

  const loadGame = async () => {
    const { gameId, playerId, peerId } = parseHash()

    if (peerId) {
      await notif.connectToPeer(peerId)
    }

    if (
      gameId &&
      playerId &&
      !selectors.isAlreadyLoaded(state, gameId, playerId)
    ) {
      const loaded = await db.loadSession(gameId)

      // Stored game
      if (loaded) {
        const { turn, player1, player2, table } = loaded

        dispatch(
          actions.loadGame({
            gameId,
            turn,
            player1,
            player2,
            table,
            me: playerId
          })
        )
      } /* else {
        // redirect and start game creation
        dispatch(actions.setGameCreation())
        window.location.hash = ""
      }*/
    }
  }

  useEffect(() => {
    // Is database initialized?
    if (db) {
      loadGame()

      window.addEventListener("hashchange", loadGame, false)
      return () => window.removeEventListener("hashchange", loadGame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])

  const onGameCreate = async (role, whoStarts, name) => {
    // create game id
    const newGameId = shortid.generate()
    const player1Id = shortid.generate()
    const player2Id = shortid.generate()

    await dispatch(
      actions.initGame({
        gameId: newGameId,
        player1Id,
        player2Id,
        role,
        whoStarts,
        name
      })
    )

    // Compose hash for player one: and redirect.
    window.location.hash = `${newGameId}.${player1Id}`
  }

  // from state to minimal stored state
  const toStoredState = (state) => ({
    player1: state.me,
    player2: state.other,
    turn: state.turn,
    table: state.table
  })

  // Synchronization function
  useEffect(() => {
    if (db) {
      // Don't update in the initial load!
      db.update(state.gameId, toStoredState(state))
    }
  }, [db, state])

  useEffect(() => {
    if (notif && state.gameId) {
      notif.onUpdate(state.gameId, async (role, move) => {
        await dispatch(actions.movementMade(role, move))
      })
    }
  }, [notif, state.gameId])

  const onMove = async (cellNumber) => {
    await dispatch(actions.makeMove(cellNumber))
    notif.notifyMove(state.gameId, selectors.getMyRole(state), cellNumber)
  }
  const onGameReset = async () => {
    await dispatch(actions.resetGame())
  }

  return (
    <Context.Provider value={{ onGameCreate, onGameReset, onMove, ...state }}>
      {children}
    </Context.Provider>
  )
}

export { PersistenceProvider, Context as PersistenceContext }
