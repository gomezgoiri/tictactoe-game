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
  const [gameId = null, playerId = null] = getHashValue().split(".")
  return { gameId, playerId }
}

// from state to minimal stored state
const toStoredState = (state) => ({
  player1: state.me,
  player2: state.other,
  turn: state.turn,
  table: state.table
})

const PersistenceProvider = ({ children }) => {
  const [db, setDatabase] = useState()
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    undefined,
    "tictactoe"
  )

  useEffect(() => {
    const initDB = async () => {
      const database = await initIpfs()
      setDatabase(database)
    }

    const { gameId, playerId } = parseHash()
    if (!gameId && !playerId) {
      dispatch(actions.setGameCreation())
    }
    initDB()
  }, [])

  useEffect(() => {
    // Has the database been initialized?
    if (db) {
      const loadGame = async () => {
        const { gameId, playerId } = parseHash()

        if (gameId && playerId) {
          console.log("let's load it")
          const loaded = await db.loadSession(gameId)
          console.log("loaded")

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
          } else {
            // redirect and start game creation
            dispatch(actions.setGameCreation())
            window.location.hash = ""
          }
        }
      }

      loadGame()
      db.onUpdated(loadGame)

      window.addEventListener("hashchange", loadGame, false)
      return () => window.removeEventListener("hashchange", loadGame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])

  // Synchronization function
  useEffect(() => {
    if (db && selectors.shouldWrite(state)) {
      // Don't update in the initial load!
      db.update(state.gameId, toStoredState(state))
    }
  }, [db, state])

  const onGameCreate = async (role, whoStarts) => {
    // create game id
    const newGameId = shortid.generate()
    const player1Id = shortid.generate()
    const player2Id = shortid.generate()

    dispatch(
      actions.initGame({
        gameId: newGameId,
        player1Id,
        player2Id,
        role,
        whoStarts
      })
    )

    // Compose hash for player one: and redirect.
    window.location.hash = `${newGameId}.${player1Id}`
  }

  const onMove = async (cellNumber) => {
    dispatch(actions.makeMove(cellNumber))
  }

  const onGameReset = async () => {
    dispatch(actions.resetGame())
  }

  return (
    <Context.Provider value={{ onGameCreate, onGameReset, onMove, ...state }}>
      {children}
    </Context.Provider>
  )
}

export { PersistenceProvider, Context as PersistenceContext }
