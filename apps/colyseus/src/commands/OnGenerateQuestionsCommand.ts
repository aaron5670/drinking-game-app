import {Command} from "@colyseus/command";
import {GameRoom} from "../rooms/GameRoom";
import {Question} from "@game/colyseus-schema";

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export class OnGenerateQuestionsCommand extends Command<GameRoom> {
  execute() {
    this.state.gameState.gameStatus = "generatingQuestions";

    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      messages: [
        {
          role: "system",
          content: "You are DrinkingGameGPT. This is a drinking game where you make up the questions. There are always two to nine players playing this game. The questions you make up are always about someone, and the idea is for the other players to vote for each other. The only thing you need to do is to create 3 questions and display them by enumeration. The game is meant for adults, so the questions can be based on that, but funny or serious questions are also allowed. Be as creative as you can with the questions. The questions must be in Dutch, and it is really important that there is no text other than the question text. Format the questions as an unordered list."
        },
        {
          role: "assistant",
          content: "- Wie heeft er wel eens een dronken blunder begaan?\n" +
            "- Wie kan er het beste dansen na een paar drankjes?\n" +
            "- Wie wordt er het snelst emotioneel na een paar drankjes?\n" +
            "- Wie heeft er wel eens gezoend met een vreemde in een bar?\n" +
            "- Wie kan er het beste tegen zijn/haar drankjes?"
        },
        {
          role: "user",
          content: "Generate 3 questions"
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
