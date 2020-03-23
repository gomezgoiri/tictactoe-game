import React, { useState, useEffect } from "react"
import Table from "Table"
import LandingPage from "LandingPage"

import styled from "styled-components"

const H1 = styled.h1`
  font-family: "Montserrat", "Open Sans", sans-serif;
`
const App = () => {
  const [gameId, setGameId] = useState(null)

  useEffect(() => {
    setGameId(window.location.hash)
    const onHashChange = e => {
      setGameId(window.location.hash)
    }
    window.addEventListener("hashchange", onHashChange, false)
    return () => window.removeEventListener("hashchange", onHashChange).remove
  }, [])

  console.log("Game ID", gameId)

  return (
    <div>
      <H1>Decentralized Tic tac toe</H1>
      {!gameId && <LandingPage />}
      {gameId && (
        <Table editable player="x" onClick={l => console.log("S", l)}>
          {["o", "x", "o", null, null, null, null, null, null]}
        </Table>
      )}
    </div>
  )
}

export default App
