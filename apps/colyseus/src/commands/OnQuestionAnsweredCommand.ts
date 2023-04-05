import {Command} from "@colyseus/command";
import {GameRoom} from "../rooms/GameRoom";
import {Client} from "colyseus";
import { AnsweredQuestions } from "@game/colyseus-schema";

interface OnQuestionAnsweredCommandPayload {
  client: Client;
  sessionId: string;
}

export class OnQuestionAnsweredCommand extends Command<GameRoom, OnQuestionAnsweredCommandPayload> {
  execute({client, sessionId}: OnQuestionAnsweredCommandPayload) {
    const currentPlayer = this.state.players.find(player => player.sessionId === client.sessionId);
    const votedPlayer = this.state.players.find(player => player.sessionId === sessionId);

    if (votedPlayer && currentPlayer) {
      const answer = new AnsweredQuestions(
        this.state.gameState.questions[this.state.gameState.round - 1].question,
        votedPlayer.sessionId,
      );

      if (answer) {
        currentPlayer.answeredQuestions[this.state.gameState.round - 1] = answer;
      }
    }

    // If all players have answered, increment the round
    if (this.state.players.every(player => player.answeredQuestions.length === this.state.gameState.round)) {

      // If all rounds have been played, end the game
      if (this.state.gameState.round === this.state.gameState.questions.length) {
        this.state.gameState.gameStatus = "finished";
        return;
      }

      // Otherwise, increment the round
      this.state.gameState.round++;
    }
  }
}
