import IPFS from "ipfs"

const IPFS_OPTIONS = {
  repo: "/orbitdb/tic-tac-toe/ipfs",
  preload: { enabled: false },
  config: {
    Addresses: {
      Swarm: [
        // Use local signal server
        // "/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star"
        "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/",
        "/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star"
      ]
    }
  },
  EXPERIMENTAL: {
    pubsub: true
  }
}

const initIpfs = async () => {
  let ipfs

  if (window.ipfs && window.ipfs.enable) {
    // Right now the injection is disabled
    // https://github.com/ipfs-shipyard/ipfs-companion/blob/master/docs/window.ipfs.md
    ipfs = await window.ipfs.enable()
  } else {
    console.error("Could not load the IPFS companion instance")
    ipfs = await IPFS.create(IPFS_OPTIONS)
  }

  // Now we'll use only OrbitDB to handle notifications
  // const notifications = new NotificationHandler(ipfs)

  return ipfs
}

export { initIpfs }
