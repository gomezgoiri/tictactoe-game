import React, { useContext } from "react"

import Table from "components/Table"
import ClipboardCopyButton from "components/ClipboardCopy"

import StateContext from "contexts/StateContext"
import { selectors } from "utils/game"

const getBaseUrl = () => {
  const { location } = window
  return (
    location.protocol +
    "//" +
    location.hostname + // we might want to change this for a gateway?
    (location.port ? ":" + location.port : "") +
    location.pathname
  )
}

const GamePage = () => {
  const { onMove, ...state } = useContext(StateContext)

  const invitationHash = selectors.getOtherPlayerHash(state)

  return (
    <>
      {invitationHash && (
        <ClipboardCopyButton value={getBaseUrl() + "#" + invitationHash}>
          Copy invitation link to clipboard
        </ClipboardCopyButton>
      )}
      <Table
        editable={selectors.isMyTurn(state)}
        player={selectors.getMyRole(state)}
        onClick={onMove}
      >
        {state.table}
      </Table>
    </>
  )
}

export default GamePage
