import React, { useContext } from "react"
import styled from "styled-components"

import { Container, CircularProgress } from "@material-ui/core"

import PersistenceContext from "contexts/PersistenceContext"
import StateContext from "contexts/StateContext"

import LandingContent from "pages/LandingPage"
import FailedLoadContent from "pages/FailedLoadPage"
import GameContent from "pages/GamePage"
import EndingContent from "pages/EndingPage"

import { selectors } from "utils/game"

const H1 = styled.h1`
  font-family: "Montserrat", "Open Sans", sans-serif;
`

const Page = ({ children }) => (
  <Container maxWidth="sm">
    <H1>Decentralized Tic tac toe</H1>
    {children}
  </Container>
)

// Usar React.lazy y React.Suspense como aquí
// https://github.com/orbitdb/orbit-web/blob/master/src/index.js

const App = () => {
  const { isDBReady, feedback } = useContext(PersistenceContext)
  const { isInGameView, ...state } = useContext(StateContext)

  if (!isInGameView) {
    // !selectors.isCreated(state)
    // No need to wait for DB loading while we create the game...
    return (
      <Page>
        <LandingContent />
      </Page>
    )
  }

  if (!isDBReady) {
    // selectors.isLoading(state))

    // import { Container, CircularProgress } from "@material-ui/core"

    return (
      <Page>
        <CircularProgress />
        {feedback.map((f) => (
          <p key={f}>{f}</p>
        ))}
      </Page>
    )
  }

  if (selectors.failedLoad(state)) {
    return (
      <Page>
        <FailedLoadContent />
      </Page>
    )
  }

  const finishedGame = selectors.isFinished(state)

  return (
    <Page>
      <EndingContent show={finishedGame} />
      <GameContent />
    </Page>
  )
}

export default App
