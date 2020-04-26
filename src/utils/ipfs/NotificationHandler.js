class NotificationHandler {
  constructor(ipfs) {
    this._ipfs = ipfs
  }

  async connectToPeer(
    multiaddr,
    protocol = "/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/p2p/"
  ) {
    try {
      console.log("Connecting to", protocol + multiaddr)
      await this._ipfs.swarm.connect(protocol + multiaddr)
    } catch (e) {
      throw e
    }
  }

  async notifyMove(gameId, role, move) {
    await this._ipfs.pubsub.publish(gameId, Buffer.from(`${role},${move}`))
  }

  async onUpdate(gameId, callback) {
    const { id } = await this._ipfs.id()

    await this._ipfs.pubsub.subscribe(gameId, ({ from, ...other }) => {
      if (from === id) {
        console.log("ID and FROM match", id)
      }
      const [role, move] = String(other.data).split(",")
      callback(role, Number(move))
    })
  }
}

export default NotificationHandler
