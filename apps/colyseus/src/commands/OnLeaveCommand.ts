import {Command} from "@colyseus/command";
import {MyRoom} from "../rooms/MyRoom";

interface OnLeaveCommandPayload {
  sessionId: string;
}

export class OnLeaveCommand extends Command<MyRoom, {
  sessionId: string,
}> {
  execute({sessionId}: OnLeaveCommandPayload) {
    const playerIndex = this.state.players.findIndex(player => player.sessionId === sessionId);
    this.state.players.splice(playerIndex, 1);
  }
}
