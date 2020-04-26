import React, { useContext } from "react"
import styled from "styled-components"

import CircularProgress from "@material-ui/core/CircularProgress"

import Table from "components/Table"
import LandingPage from "components/LandingPage"
import EndingPage from "components/EndingPage"
import ClipboardCopyButton from "components/ClipboardCopy"

import { PersistenceContext } from "components/PersistenceContext"
import { selectors } from "utils/game"

const H1 = styled.h1`
  font-family: "Montserrat", "Open Sans", sans-serif;
`

const getBaseUrl = () => {
  const { location } = window
  return (
    location.protocol +
    "//" +
    location.hostname + // we might want to change this for a gateway?
    (location.port ? ":" + location.port : "") +
    location.pathname
  )
}

// Usar React.lazy y React.Suspense como aquí
// https://github.com/orbitdb/orbit-web/blob/master/src/index.js

const App = () => {
  const { onGameCreate, onGameReset, onMove, ...state } = useContext(
    PersistenceContext
  )
  const { gameId } = state

  if (selectors.isLoading(state)) {
    return (
      <div>
        <div>Loading...</div>
        <CircularProgress />
      </div>
    )
  }

  const invitationHash = selectors.getOtherPlayerHash(state)

  const finishedGame = selectors.isFinished(state)

  return (
    <>
      <H1>Decentralized Tic tac toe</H1>
      {!gameId && <LandingPage onCreate={onGameCreate} />}
      {gameId && (
        <>
          <EndingPage show={finishedGame} onReset={onGameReset} />
          {invitationHash && (
            <ClipboardCopyButton value={getBaseUrl() + "#" + invitationHash}>
              Copy invitation link to clipboard
            </ClipboardCopyButton>
          )}
          <Table
            editable={selectors.isMyTurn(state)}
            player={selectors.getMyRole(state)}
            onClick={onMove}
          >
            {state.table}
          </Table>
        </>
      )}
    </>
  )
}

export default App
