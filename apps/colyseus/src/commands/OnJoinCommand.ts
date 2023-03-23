import {Command} from "@colyseus/command";
import {MyRoom} from "../rooms/MyRoom";
import {Player} from "@game/colyseus-schema";

interface OnJoinCommandPayload {
  username: string;
  sessionId: string;
  isHost?: boolean;
}

export class OnJoinCommand extends Command<MyRoom, {
  sessionId: string,
  username: string,
  isHost?: boolean
}> {
  execute({username, sessionId, isHost = false}: OnJoinCommandPayload) {
    this.state.players.push(new Player(username, sessionId, isHost))
  }
}
