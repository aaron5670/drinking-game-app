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
      this.room.setPrivate(true).then(() => this.room.broadcast("startGame", "Game is starting..."))

      // let random player be the first player
      this.state.gameState.currentPlayer = this.state.players[Math.floor(Math.random() * this.state.players.length)];
      console.log('Host is starting the game...')
    }
  }
}
