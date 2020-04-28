import React, { useState } from "react"
import PropTypes from "prop-types"

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core"

import { ROLES, otherRole } from "utils/game"

const EMPTY_FN = () => {}

const GameCreator = ({ onCreate = EMPTY_FN }) => {
  const [role, setRole] = useState(ROLES.X)
  const [whoStarts, setWhoStarts] = useState(ROLES.X)

  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      <p>
        Do you want to play it? Select your role and who makes the first move.
      </p>
      <FormControl>
        <InputLabel htmlFor="player-role">Role</InputLabel>
        <Select
          autoFocus
          value={role}
          onChange={(e) => setRole(e.target.value)}
          inputProps={{
            id: "player-role"
          }}
        >
          <MenuItem value={ROLES.X}>Crosses</MenuItem>
          <MenuItem value={ROLES.O}>Doughts</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="who-starts">Who starts</InputLabel>
        <Select
          autoFocus
          value={whoStarts}
          onChange={(e) => setWhoStarts(e.target.value)}
          inputProps={{
            id: "who-starts"
          }}
        >
          <MenuItem value={role}>Me</MenuItem>
          <MenuItem value={otherRole(role)}>My oponent</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() => onCreate(role, whoStarts)}
      >
        Create new game
      </Button>
    </Grid>
  )
}

GameCreator.propTypes = {
  onCreate: PropTypes.func
}

export default GameCreator
