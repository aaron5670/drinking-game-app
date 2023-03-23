import {Command} from "@colyseus/command";
import {GameRoom} from "../rooms/GameRoom";
import {Player} from "@game/colyseus-schema";

interface OnJoinCommandPayload {
  username: string;
  sessionId: string;
  isHost?: boolean;
}

export class OnJoinCommand extends Command<GameRoom, OnJoinCommandPayload> {
  execute({username, sessionId, isHost = false}: OnJoinCommandPayload) {
    this.state.players.push(new Player(username, sessionId, isHost))

    if (isHost) {
      this.state.host = this.state.players[0];
    }
  }
}
