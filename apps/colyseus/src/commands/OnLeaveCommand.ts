import {Command} from "@colyseus/command";
import {GameRoom} from "../rooms/GameRoom";

interface OnLeaveCommandPayload {
  sessionId: string;
}

export class OnLeaveCommand extends Command<GameRoom, OnLeaveCommandPayload> {
  execute({sessionId}: OnLeaveCommandPayload) {
    const playerIndex = this.state.players.findIndex(player => player.sessionId === sessionId);
    this.state.players.splice(playerIndex, 1);
  }
}
