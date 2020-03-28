import React, { useState } from "react"
import PropType from "prop-types"

import styled from "styled-components"
import { Button } from "@material-ui/core"

const CopyingMark = styled.span`
  ${({ copying = false }) => (copying ? "color: #e85479;" : "")}
`

const copyToClipboard = (value, shouldLog) => {
  const el = document.createElement("textarea")
  el.value = value
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
  if (shouldLog) {
    console.log(`Copied to clipboard: ${value}`)
  }
}

const ClipboardCopy = ({ value = "", children, hideLog = false, ...other }) => {
  const [copying, setCopying] = useState(false)

  const onClick = () => {
    setCopying(true)
    copyToClipboard(value, !hideLog)
    setTimeout(() => setCopying(false), 500)
  }

  return (
    <CopyingMark copying={copying}>
      <Button onClick={onClick}>{children}</Button>
    </CopyingMark>
  )
}

ClipboardCopy.propTypes = {
  value: PropType.string,
  children: PropType.node,
  hideLog: PropType.bool
}

export default ClipboardCopy
