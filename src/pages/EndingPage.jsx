import React, { useContext } from "react"
import PropTypes from "prop-types"

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core"

import StateContext from "contexts/StateContext"
import Table from "components/Table"
import { selectors } from "utils/game"

const EndingPage = ({ show = false }) => {
  const { onGameReset, ...state } = useContext(StateContext)

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
        {winner && <p>You {me === winner ? "won" : "lost"}!</p>}
        {!winner && <p>Tie!</p>}

        <Table size={15} editable={false} highligthed={winnerLine}>
          {state.table}
        </Table>
      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={onGameReset} color="primary">
          Reset game
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EndingPage.propTypes = {
  show: PropTypes.bool
}

export default EndingPage
