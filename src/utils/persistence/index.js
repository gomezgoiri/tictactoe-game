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
  const db = await orbitdb.keyvalue("fugitive-name.game")
  await db.load()

  // Listen for updates from peers
  db.events.on("replicated", address => {
    console.log(db.iterator({ limit: -1 }).collect())
  })

  const initSession = async (
    gameId,
    player1Id,
    player2Id,
    player1Role,
    player1Name,
    turn
  ) => {
    await db.put(gameId, {
      player1: {
        id: player1Id,
        role: player1Role,
        name: player1Name
      },
      player2: {
        id: player2Id
      },
      turn
    })
  }

  const loadSession = async gameId => await db.get(gameId)

  return { initSession, loadSession }
}

export { initDb }
