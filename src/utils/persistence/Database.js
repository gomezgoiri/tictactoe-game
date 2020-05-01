import OrbitDB from "orbit-db"

class Database {
  constructor(dbInstance) {
    this._db = dbInstance
    this._initialReplica = false

    /*dbInstance.events.on("write", (address, entry, heads) => {
      console.log("Write", entry.payload)
    })*/

    dbInstance.events.on("load", (...args) => {
      console.log("Load", args)
    })

    dbInstance.events.on("load.progress", (...args) => {
      console.log("Load progress", args)
    })

    dbInstance.events.on("ready", (...args) => {
      console.log("Ready", args)
    })

    dbInstance.events.on("peer", (...args) => {
      console.log("Peer", args)
    })

    dbInstance.events.on("closed", (...args) => {
      console.log("Closed", args)
    })
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

const OPTIONS = {
  // If database doesn't exist, create it
  create: true,
  overwrite: false,
  // Load only the local version of the database,
  // don't load the latest from the network yet
  localOnly: false,
  // Give write access to everyone
  accessController: {
    write: ["*"]
  }
}

const createOrbitInstance = (ipfs) => OrbitDB.createInstance(ipfs)

const createDatabase = (orbitdb) =>
  orbitdb.keyvalue("tic-tac-toe.game", OPTIONS)

const loadDatabase = async (db) => {
  await db.load()
  return new Database(db)
}

export { createOrbitInstance, createDatabase, loadDatabase }
