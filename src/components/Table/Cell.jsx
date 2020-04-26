import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

/*
  border: 5px solid white;
  border-radius: 14px;
  
  height: 140px;
  width: 140px;

  font-size: 4em;
  font-weight: 900;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
*/

const Td = styled.td`
  background-color: #78bec5;
  cursor: pointer;

  color: white;
  font-family: "Montserrat", "Open Sans", sans-serif;
  font-weight: 900;

  text-align: center;
  transition: background-color 0.3s;

  ${({ size = 20 }) => `  
    height: ${size}vh;
    width: ${size}vh;

    border: 5px solid white;
    border-radius: 14px;

    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-size: ${size / 2}vh;
  `}

  ${({ player, editable = false }) =>
    editable &&
    player &&
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

  &.shadowed {
    background-color: #ccc;
  }
`

const Cell = ({ children = "", shadowed = false, ...other }) => {
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

  const shadowedClass = shadowed ? " shadowed" : ""

  return <Td className={className + shadowedClass} {...other} />
}

Cell.propTypes = {
  size: PropTypes.number,
  editable: PropTypes.bool,
  shadowed: PropTypes.bool,
  player: PropTypes.oneOf(["x", "o"]),
  children: PropTypes.oneOf(["x", "o", null]),
  onClick: PropTypes.func.isRequired
}

export default Cell
