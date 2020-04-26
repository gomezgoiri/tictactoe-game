import IPFS from "ipfs"
import OrbitDB from "orbit-db"

const ipfsOptions = {
  repo: "/orbitdb/tic-tac-toe/ipfs",
  config: {
    Addresses: {
      Swarm: [
        // Use local signal server
        // "/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star"
        "/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star"
        // "/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star"
      ]
    }
  },
  EXPERIMENTAL: {
    pubsub: true
  }
}

const initDb = async () => {
  let ipfs

  if (window.ipfs && window.ipfs.enable) {
    // Right now the injection is disabled
    // https://github.com/ipfs-shipyard/ipfs-companion/blob/master/docs/window.ipfs.md
    ipfs = await window.ipfs.enable()
  } else {
    console.error("Could not load the IPFS companion instance")
    ipfs = await IPFS.create(ipfsOptions)
  }

  const { id } = await ipfs.id()
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

  db.events.on("replicated", (address) => {
    console.log("Replicated", address)
    // Each time the player updates the DB
  })

  db.events.on("ready", () => {
    console.log("Ready")
  })

  db.events.on("write", () => {
    console.log("Write")
  })

  db.events.on("load.progress", (address, hash, entry, progress, total) => {
    console.log("Loading", address, hash, entry, progress, total)
  })

  const loadSession = async (gameId) => await db.get(gameId)

  const connectToPeer = async (
    multiaddr,
    protocol = "/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/p2p/"
  ) => {
    try {
      console.log("Connecting to", protocol + multiaddr)
      await ipfs.swarm.connect(protocol + multiaddr)
    } catch (e) {
      throw e
    }
  }

  const update = async (gameId, newState) => {
    await db.put(gameId, newState)
  }

  const notifyMove = async (gameId, role, move) => {
    await ipfs.pubsub.publish(gameId, Buffer.from(`${role},${move}`))
  }

  const onUpdate = async (gameId, callback) => {
    await ipfs.pubsub.subscribe(gameId, ({ from, ...other }) => {
      if (from === id) {
        console.log("ID and FROM match", id)
      }
      const [role, move] = String(other.data).split(",")
      callback(role, Number(move))
    })
  }

  return { loadSession, connectToPeer, update, notifyMove, onUpdate }
}

export { initDb }
