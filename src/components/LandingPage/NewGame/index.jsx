import React, { useState } from "react"
import PropTypes from "prop-types"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@material-ui/core"

import { ROLES, otherRole } from "utils/game"

const NewGameDialog = ({ open, onCreate, onClose }) => {
  const [role, setRole] = useState(ROLES.X)
  const [whoStarts, setWhoStarts] = useState(ROLES.X)
  const [name, setName] = useState()

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="creation-dialog-title"
    >
      <DialogTitle id="creation-dialog-title">Create new game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select your role, your name and who makes the first move.
        </DialogContentText>

        <FormControl>
          <InputLabel htmlFor="player-role">Role</InputLabel>
          <Select
            autoFocus
            value={role}
            onChange={e => setRole(e.target.value)}
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
            onChange={e => setWhoStarts(e.target.value)}
            inputProps={{
              id: "who-starts"
            }}
          >
            <MenuItem value={role}>Me</MenuItem>
            <MenuItem value={otherRole(role)}>My oponent</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="player-name"
          label="Player name"
          onChange={e => setName(e.target.value)}
        >
          {name}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={() => onCreate(role, whoStarts, name)} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

NewGameDialog.propTypes = {
  open: PropTypes.bool,
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default NewGameDialog
