import React, { useState, useEffect } from "react"

import {
  initIpfs,
  createOrbitInstance,
  createDatabase,
  loadDatabase
} from "utils/persistence"

const Context = React.createContext()

const PersistenceProvider = ({ children }) => {
  const [database, setDatabase] = useState(null)
  const [feedback, setFeedback] = useState([])

  const addFeedback = (fb, newLine, previousLineUpdated) => {
    const newFeedback = [...fb, newLine]
    if (previousLineUpdated) {
      newFeedback.splice(newFeedback.length - 2, 1, previousLineUpdated)
    }
    setFeedback(newFeedback)
    return newFeedback
  }

  useEffect(() => {
    const initDB = async () => {
      let fb = feedback
      try {
        fb = addFeedback(fb, "Creating IPFS instance.")
        const ipfs = await initIpfs()

        fb = addFeedback(
          fb,
          "Creating OrbitDB instance.",
          "IPFS instance created"
        )
        const orbitdb = await createOrbitInstance(ipfs)

        fb = addFeedback(fb, "Creating database.", "OrbitDB instance created.")
        const db = await createDatabase(orbitdb)

        fb = addFeedback(fb, "Loading database.", "Database created.")
        const loadedDb = await loadDatabase(db)

        fb = addFeedback(fb, "Preparing game...", "Database loaded.")
        setDatabase(loadedDb)
      } catch (e) {
        addFeedback(fb, "Error!")
        console.error("Error creating DB", e)
      }
    }

    initDB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider
      value={{ db: database, isDBReady: database !== null, feedback }}
    >
      {children}
    </Context.Provider>
  )
}

export { PersistenceProvider }
export default Context
