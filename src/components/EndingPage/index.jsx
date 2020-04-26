import React, { useContext } from "react"
import PropTypes from "prop-types"

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core"

import { PersistenceContext } from "components/PersistenceContext"
import Table from "components/Table"
import { selectors } from "utils/game"

const EndingPage = ({ show = false, onReset }) => {
  const { onGameCreate, onMove, ...state } = useContext(PersistenceContext)

  const me = selectors.getMyRole(state)
  const winner = selectors.getWinner(state)
  const winnerLine = selectors.getWinnerLine(state)

  return (
    <Dialog
      open={show}
      aria-labelledby="ending-dialog-title"
      aria-describedby="simple-modal-description"
    >
      <DialogTitle id="ending-dialog-title">Game finished!</DialogTitle>
      <DialogContent>
        <p>You {me === winner ? "won" : "lost"}!</p>

        <Table size={15} editable={false} highligthed={winnerLine}>
          {state.table}
        </Table>
      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={onReset} color="primary">
          Reset game
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EndingPage.propTypes = {
  show: PropTypes.bool,
  onReset: PropTypes.func.isRequired
}

export default EndingPage
