import React from "react"
import PropTypes from "prop-types"

import Cell from "./Cell"

const Row = ({ children = [], highligthed = [], onClick, ...other }) => (
  <tr>
    {children.map((v, k) => (
      <Cell
        key={k}
        shadowed={!highligthed[k]}
        onClick={() => onClick(k)}
        {...other}
      >
        {v}
      </Cell>
    ))}
  </tr>
)

Row.propTypes = {
  highligthed: PropTypes.arrayOf(PropTypes.bool),
  children: PropTypes.arrayOf(PropTypes.oneOf(["x", "o", null])),
  onClick: PropTypes.func.isRequired
}

export default Row
