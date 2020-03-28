import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Td = styled.td`
  background-color: #78bec5;
  border: 5px solid white;
  border-radius: 14px;
  cursor: pointer;

  height: 140px;
  width: 140px;

  color: white;
  font-family: "Montserrat", "Open Sans", sans-serif;
  font-size: 4em;
  font-weight: 900;

  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  ${({ player, editable = false }) =>
    editable &&
    `&:hover {
        background-color: #3d4250;
        content: "${player}";
      }

      &:hover:after {
        content: "${player}";
      }
      `}

  &.cross {
    background-color: #dc685a;

    &:after {
      content: "x";
    }
  }

  &.nought {
    background-color: #ecaf4f;

    &:after {
      content: "o";
    }
  }
`

const Cell = ({ children = "", ...other }) => {
  let className

  switch (children) {
    case "o":
      className = "nought"
      break
    case "x":
      className = "cross"
      break
    default:
  }

  return <Td className={className} {...other} />
}

Cell.propTypes = {
  editable: PropTypes.bool,
  children: PropTypes.oneOf(["x", "o", null]),
  player: PropTypes.oneOf(["x", "o"]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Cell
