import React from "react"

import shortid from "shortid"
import { initDb } from "utils/persistence"

const Context = React.createContext()

class PersistenceProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hola: "caracola" }
  }

  onHashChange = () => {
    this.setState({ gameId: window.location.hash })
  }

  getHashValue() {
    const { hash } = window.location
    return hash ? hash.substr(1) : hash
  }

  componentDidMount() {
    const db = initDb()

    const onGameCreate = (role, whoStarts, name) => {
      // create game id
      const newGameId = shortid.generate()
      const player1Id = shortid.generate()
      const player2Id = shortid.generate()

      // Compose hash for player one: gameId.player1
      const p1Hash = `${newGameId}.${player1Id}`
      const p2Hash = `${newGameId}.${player2Id}`

      // store game info
      console.log("Store", role, whoStarts, name)

      this.setState({ playerId: player1Id, p2Hash })

      // redirect to hash!
      window.location.hash = p1Hash
    }

    window.addEventListener("hashchange", this.onHashChange, false)

    const [gameId, playerId = null] = this.getHashValue().split(".")
    // Maybe gameId is not really needed...
    this.setState({ db, gameId, playerId, onGameCreate })
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.onHashChange)
  }

  /*
    // Add an entry
    const hash = await db.put({ _id: "game1", hello: "world", aitor: "tor" })
    console.log(hash)

    // Query
    let result = db.get("game1")
    console.log(JSON.stringify(result, null, 2))

    await db.put({ _id: "game1", hello: "world", nai: "ara" })
    result = db.get("game1")
    console.log(JSON.stringify(result, null, 2))
  */

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

const PersistenceConsumer = Context.Consumer

export { PersistenceProvider, PersistenceConsumer }
