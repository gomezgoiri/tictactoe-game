import IPFS from "ipfs"
import OrbitDB from "orbit-db"

// Documentos
// Game (para los datos del juego: decks, etc.)
// Marshal (se usa para el path)
// Fugitive (se usa para el path)

const initDb = async () => {
  const ipfs = await IPFS.create()

  const orbitdb = await OrbitDB.createInstance(ipfs)

  // Create / Open a database
  const db = await orbitdb.docs("fugitive-name.game")
  await db.load()

  // Listen for updates from peers
  db.events.on("replicated", address => {
    console.log(db.iterator({ limit: -1 }).collect())
  })

  return db
}

export { initDb }
