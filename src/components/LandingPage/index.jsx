import React, { useState } from "react"
import PropTypes from "prop-types"

import { ButtonGroup, Button } from "@material-ui/core"
import NewGameDialog from "./NewGame"

const EMPTY_FN = () => {}

const GameCreator = ({ onCreate = EMPTY_FN }) => {
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
          onCreate(role, whoStarts, name)
          setCreating(false)
        }}
        onClose={() => setCreating(false)}
      />
    </>
  )
}

GameCreator.propTypes = {
  onCreate: PropTypes.func
}

export default GameCreator
