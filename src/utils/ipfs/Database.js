import OrbitDB from "orbit-db"

class Database {
  constructor(dbInstance) {
    this._db = dbInstance
    this._initialReplica = false

    /*dbInstance.events.on("write", (address, entry, heads) => {
      console.log("Write", entry.payload)
    })*/
  }

  async loadSession(gameId) {
    return await this._db.get(gameId)
  }

  async update(gameId, newState) {
    await this._db.put(gameId, newState)
  }

  onUpdated(listener) {
    this._db.events.on("replicated", () => {
      if (!this._initialReplica) {
        // After loading the state for the first time,
        // OrbitDB replicates it but we don't want a callback.
        this._initialReplica = true
      } else {
        listener()
      }
    })
  }
}

const createDatabase = async (ipfs) => {
  const orbitdb = await OrbitDB.createInstance(ipfs)

  const options = {
    // If database doesn't exist, create it
    create: true,
    overwrite: true,
    // Load only the local version of the database,
    // don't load the latest from the network yet
    localOnly: false,
    // Give write access to everyone
    accessController: {
      write: ["*"]
    }
  }

  // Create / Open a database
  const db = await orbitdb.keyvalue("tic-tac-toe.game", options)
  await db.load()

  return new Database(db)
}

export default createDatabase
