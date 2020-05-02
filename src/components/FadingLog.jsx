import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const FadingText = styled.div`
  max-height: 120px;
  position: relative;
  overflow: hidden;

  ${({ manyLines = false }) =>
    manyLines &&
    `
  & div:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(white 10%, transparent 80%);
  }
  `}
`

const FadingLog = ({ feedback = [] }) => (
  <FadingText manyLines={feedback.length > 1}>
    <div>
      {feedback.map((f) => (
        <p key={f}>{f}</p>
      ))}
    </div>
  </FadingText>
)

FadingLog.propTypes = {
  feedback: PropTypes.arrayOf(PropTypes.string)
}

export default FadingLog
