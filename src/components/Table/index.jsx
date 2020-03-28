import React from "react"
import PropTypes from "prop-types"

import Row from "./Row"

const Table = ({ children = [], onClick, ...other }) => {
  const shiftOnClick = (n = 0) => i => {
    if (other.editable) {
      onClick(i + n)
    }
  }

  return (
    <table>
      <tbody>
        <Row onClick={shiftOnClick()} {...other}>
          {children.slice().splice(0, 3)}
        </Row>
        <Row onClick={shiftOnClick(3)} {...other}>
          {children.slice().splice(3, 3)}
        </Row>
        <Row onClick={shiftOnClick(6)} {...other}>
          {children.slice().splice(6, 3)}
        </Row>
      </tbody>
    </table>
  )
}

Table.propTypes = {
  editable: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.oneOf(["x", "o", null])).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Table
