import {Command} from "@colyseus/command";
import {GameRoom} from "../rooms/GameRoom";
import {Client} from "colyseus";

interface OnGameStartCommandPayload {
  client: Client;
}

export class OnGameStartCommand extends Command<GameRoom, OnGameStartCommandPayload> {
  execute({client}: OnGameStartCommandPayload) {
    const player = this.state.players.find(player => player.sessionId === client.sessionId);
    if (player.isHost) {
      this.room.setPrivate(true).then(() => {
        this.state.gameState.gameStarted = true;
      });
    }
  }
}
