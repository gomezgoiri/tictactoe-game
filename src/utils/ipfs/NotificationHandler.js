const serializeTopic = (gameId, command) => `${gameId}.${command}`

const serializeNotification = (data = []) => Buffer.from(data.join(","))

const parseNotification = (bytes) => String(bytes).split(",")

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
    await this._ipfs.pubsub.publish(
      serializeTopic(gameId, "move"),
      serializeNotification([role, move])
    )
  }

  async notifyReset(gameId) {
    await this._ipfs.pubsub.publish(serializeTopic(gameId, "reset"))
  }

  async on(gameId, command, callback) {
    const { id } = await this._ipfs.id()

    await this._ipfs.pubsub.subscribe(
      serializeTopic(gameId, command),
      ({ from, ...other }) => {
        if (from === id) {
          console.log("ID and FROM match", id)
        }

        callback(parseNotification(other.data))
      }
    )
  }
}

export default NotificationHandler
