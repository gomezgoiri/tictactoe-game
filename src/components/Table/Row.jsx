import React from "react"
import PropTypes from "prop-types"

import Cell from "./Cell"

const Row = ({ children = [], onClick, ...other }) => (
  <tr>
    {children.map((v, k) => (
      <Cell key={k} onClick={() => onClick(k)} {...other}>
        {v}
      </Cell>
    ))}
  </tr>
)

Row.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOf(["x", "o", null])),
  onClick: PropTypes.func.isRequired
}

export default Row
