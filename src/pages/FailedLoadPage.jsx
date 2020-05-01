import React, { useContext } from "react"

import StateContext from "contexts/StateContext"
import { Button, ButtonGroup } from "@material-ui/core"

const LoadFail = () => {
  const { onRedirectToStart, onReload } = useContext(StateContext)

  return (
    <>
      <p>The game could not be loaded.</p>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={onRedirectToStart}>Go and create a new game</Button>
        <Button onClick={onReload}>Retry load</Button>
      </ButtonGroup>
    </>
  )
}

export default LoadFail
