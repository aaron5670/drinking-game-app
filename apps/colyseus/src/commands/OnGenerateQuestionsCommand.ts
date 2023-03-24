import {Command} from "@colyseus/command";
import {GameRoom} from "../rooms/GameRoom";
import {Question} from "@game/colyseus-schema";
import {decode} from 'html-entities';

function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export class OnGenerateQuestionsCommand extends Command<GameRoom> {
  execute() {
    this.state.gameState.gameStatus = "generatingQuestions";

    // Fetch questions from Open Trivia DB API
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean")
      .then((response) => response.json())
      .then((data) => {
        return data.results.map((question: any) => {
          return new Question({
            category: question.category,
            type: question.type,
            difficulty: question.difficulty,
            question: decode(question.question),
            correct_answer: question.correct_answer,
            incorrect_answers: question.incorrect_answers
          });
        });
      })
      .then((questions) => {
        // set questions
        this.state.gameState.questions = questions;

        // set random player as current player
        this.state.gameState.currentPlayer = this.state.players[Math.floor(Math.random() * this.state.players.length)];

        // set game status to ready
        this.state.gameState.gameStatus = "ready";
      })
      .catch((e) => {
        this.state.gameState.gameStarted = false;
        this.state.gameState.gameStatus = "idle";
        console.error(e);
      }
    );
  }
}
