import React, { useContext } from "react"
import styled from "styled-components"

import Table from "components/Table"
import LandingPage from "components/LandingPage"
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

const App = () => {
  const { onGameCreate, onMove, ...state } = useContext(PersistenceContext)
  const { gameId } = state
  const invitationHash = selectors.getOtherPlayerHash(state)

  return (
    <>
      <H1>Decentralized Tic tac toe</H1>
      {!gameId && <LandingPage onCreate={onGameCreate} />}
      {gameId && (
        <>
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
