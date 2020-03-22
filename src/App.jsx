import React from "react"
import Table from "Table"

const App = () => (
  <div>
    <header className="App-header">
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    <Table editable player="x" onClick={l => console.log("S", l)}>
      {["o", "x", "o", null, null, null, null, null, null]}
    </Table>
  </div>
)

export default App
