import React from "react"
import ReactDOM from "react-dom"

import { StateInspector } from "reinspect"
import { PersistenceProvider } from "contexts/PersistenceContext"
import { StateProvider } from "contexts/StateContext"

import App from "./App"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <React.StrictMode>
    <StateInspector name="TicTacToe">
      <PersistenceProvider>
        <StateProvider>
          <App />
        </StateProvider>
      </PersistenceProvider>
    </StateInspector>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
