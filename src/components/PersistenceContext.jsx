import React, { useState, useEffect } from "react"
import { useReducer } from "reinspect"

import shortid from "shortid"
import CircularProgress from "@material-ui/core/CircularProgress"

import { initDb } from "utils/persistence"
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
      setDatabase(await initDb())
    }

    const { gameId, playerId } = parseHash()
    if (!gameId && !playerId) {
      dispatch(actions.setGameCreation())
    }
    initDB()
  }, [])

  const loadGame = async () => {
    const { gameId, playerId } = parseHash()
    if (
      gameId &&
      playerId &&
      !selectors.isAlreadyLoaded(state, gameId, playerId)
    ) {
      const loaded = await db.loadSession(gameId)

      // Stored game
      if (loaded) {
        const { turn, player1, player2 } = loaded

        // console.log(JSON.stringify(result, null, 2))
        dispatch(
          actions.loadGame({
            gameId,
            turn,
            player1,
            player2,
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

    // store game info
    await db.initSession(newGameId, player1Id, player2Id, role, name, whoStarts)

    // Compose hash for player one: and redirect.
    window.location.hash = `${newGameId}.${player1Id}`
  }

  const onMove = async cellNumber =>
    await dispatch(actions.makeMove(cellNumber))

  if (selectors.isLoading(state)) {
    return (
      <div>
        <div>Loading...</div>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Context.Provider value={{ onGameCreate, onMove, ...state }}>
      {children}
    </Context.Provider>
  )
}

export { PersistenceProvider, Context as PersistenceContext }
