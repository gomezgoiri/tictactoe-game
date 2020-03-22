import React from "react"
import PropTypes from "prop-types"

import Row from "./Row"

const Table = ({ children = [], onClick, ...other }) => (
  <table>
    <tbody>
      <Row onClick={i => onClick(i)} {...other}>
        {children.slice().splice(0, 3)}
      </Row>
      <Row onClick={i => onClick(i + 3)} {...other}>
        {children.slice().splice(3, 3)}
      </Row>
      <Row onClick={i => onClick(i + 6)} {...other}>
        {children.slice().splice(6, 3)}
      </Row>
    </tbody>
  </table>
)

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOf(["x", "o"])),
  onClick: PropTypes.func.isRequired
}

export default Table
