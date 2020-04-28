import React, { useContext } from "react"
import styled from "styled-components"

import { Container, CircularProgress } from "@material-ui/core"

import LandingContent from "pages/LandingPage"
import GameContent from "pages/GamePage"
import EndingContent from "pages/EndingPage"

import { PersistenceContext } from "components/PersistenceContext"
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
  const { onGameCreate, onGameReset, ...state } = useContext(PersistenceContext)

  if (selectors.isLoading(state)) {
    return (
      <Page>
        <p>Loading...</p>
        <CircularProgress />
      </Page>
    )
  }

  if (!selectors.isCreated(state)) {
    return (
      <Page>
        <LandingContent onCreate={onGameCreate} />
      </Page>
    )
  }

  const finishedGame = selectors.isFinished(state)

  return (
    <Page>
      <EndingContent show={finishedGame} onReset={onGameReset} />
      <GameContent />
    </Page>
  )
}

export default App
