import React, { useState } from "react"

import { ButtonGroup, Button } from "@material-ui/core"
import NewGameDialog from "./NewGame"

const GameCreator = () => {
  const [creating, setCreating] = useState(false)

  return (
    <>
      <p>Do you want to play it?</p>
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => setCreating(true)}>Create new game</Button>
        <Button>Join existing game</Button>
      </ButtonGroup>
      <NewGameDialog
        open={creating}
        onCreate={(role, whoStarts, name) => {
          console.log("CREATE", role, whoStarts, name)
          setCreating(false)
        }}
        onClose={() => setCreating(false)}
      />
    </>
  )
}

export default GameCreator
