import React from "react"
import styled from "styled-components"

import Table from "components/Table"
import LandingPage from "components/LandingPage"
import { PersistenceConsumer } from "components/PersistenceContext"

const H1 = styled.h1`
  font-family: "Montserrat", "Open Sans", sans-serif;
`

const App = () => (
  <>
    <H1>Decentralized Tic tac toe</H1>
    <PersistenceConsumer>
      {({ gameId, playerId, p2Hash, onGameCreate }) => (
        <>
          {!gameId && <LandingPage onCreate={onGameCreate} />}
          {gameId && (
            <>
              {p2Hash && (
                <p>
                  Invite to the other player passing{" "}
                  <a href={"#" + p2Hash}>this link</a>
                </p>
              )}
              <Table editable player="x" onClick={l => console.log("S", l)}>
                {["o", "x", "o", null, null, null, null, null, null]}
              </Table>
            </>
          )}
        </>
      )}
    </PersistenceConsumer>
  </>
)

export default App
