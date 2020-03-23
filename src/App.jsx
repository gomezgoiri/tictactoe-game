import React, { useState, useEffect } from "react"
import Table from "Table"
import GameCreator from "GameCreator"

// window.location.hash

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
      {!gameId && <GameCreator />}
      {gameId && (
        <Table editable player="x" onClick={l => console.log("S", l)}>
          {["o", "x", "o", null, null, null, null, null, null]}
        </Table>
      )}
    </div>
  )
}

export default App
