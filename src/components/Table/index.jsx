import React from "react"
import PropTypes from "prop-types"

import Row from "./Row"

const Table = ({ children = [], highligthed = [], onClick, ...other }) => {
  const shiftOnClick = (n = 0) => (i) => {
    if (other.editable) {
      onClick(i + n)
    }
  }

  const highlightRow = (arr) =>
    arr.map((v) => highligthed.length === 0 || highligthed.indexOf(v) > -1)

  return (
    <table>
      <tbody>
        <Row
          highligthed={highlightRow([0, 1, 2])}
          onClick={shiftOnClick()}
          {...other}
        >
          {children.slice().splice(0, 3)}
        </Row>
        <Row
          highligthed={highlightRow([3, 4, 5])}
          onClick={shiftOnClick(3)}
          {...other}
        >
          {children.slice().splice(3, 3)}
        </Row>
        <Row
          highligthed={highlightRow([6, 7, 8])}
          onClick={shiftOnClick(6)}
          {...other}
        >
          {children.slice().splice(6, 3)}
        </Row>
      </tbody>
    </table>
  )
}

Table.propTypes = {
  editable: PropTypes.bool.isRequired,
  highligthed: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.arrayOf(PropTypes.oneOf(["x", "o", null])).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Table
