import {Command} from "@colyseus/command";
import {GameRoom} from "../rooms/GameRoom";
import {Question} from "@game/colyseus-schema";
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const totalQuestions = 2;
const language = "Dutch";
const category: string = null;

export class OnGenerateQuestionsCommand extends Command<GameRoom> {
  execute() {
    this.state.gameState.gameStatus = "generatingQuestions";

    openai.createChatCompletion({
      model: "gpt-4",
      temperature: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      messages: [
        {
          role: "system",
          content:
            "You are DrinkingGameGPT. This is a drinking game where you make up the questions. " +
            "There are always multiple players participating. " +
            "The questions you make up are always about someone. The idea is that the other players vote on who the question is about. " +
            "The only thing you need to do is to generate questions and display them by enumeration. " +
            "The game is meant for adults, so the questions can be based on that, but funny or serious questions are also allowed. " +
            "Be as creative as you can with the questions. " +
            `The questions must be in ${language}, and it is really important that there is no text other than the question text. ` +
            "Format the questions as an unordered list.",
        },
        {
          role: "user",
          content: `Generate ${totalQuestions} random questions ${category ? `about ${category}.` : "."}`,
        },
      ],
    })
      .then((data: any) => {
        return data.data.choices[0].message.content
          .split("- ")
          .map((question: string) => new Question({question: question}));
      })
      .then((questions: Question[]) => {
        // set questions (slice first element because it is empty)
        this.state.gameState.questions = questions.slice(1, questions.length);

        // set random player as current player
        this.state.gameState.currentPlayer = this.state.players[Math.floor(Math.random() * this.state.players.length)];

        // set game status to ready
        this.state.gameState.gameStatus = "ready";
      })
      .catch((e: any) => {
          this.state.gameState.gameStarted = false;
          this.state.gameState.gameStatus = "idle";
          console.error(e);
        }
      );
  }
}
