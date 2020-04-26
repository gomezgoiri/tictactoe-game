import OrbitDB from "orbit-db"

class Database {
  constructor(dbInstance) {
    this._db = dbInstance

    dbInstance.events.on("replicated", (address) => {
      console.log("Replicated", address)
      // Each time the player updates the DB
    })

    dbInstance.events.on("ready", () => {
      console.log("Ready")
    })

    dbInstance.events.on("write", () => {
      console.log("Write")
    })

    dbInstance.events.on(
      "load.progress",
      (address, hash, entry, progress, total) => {
        console.log("Loading", address, hash, entry, progress, total)
      }
    )
  }

  async loadSession(gameId) {
    return await this._db.get(gameId)
  }

  async update(gameId, newState) {
    await this._db.put(gameId, newState)
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
