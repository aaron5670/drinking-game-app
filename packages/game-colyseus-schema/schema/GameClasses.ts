import {Schema, ArraySchema, type} from "@colyseus/schema";

export type GameStatus = "idle" | "generatingQuestions" | "ready" | "finished";

export class Question extends Schema {
  @type("string") question: string;
}

export class AnsweredQuestions extends Schema {
  @type(Question) question: Question = new Question();
  @type("string") sessionId: string;

  constructor(question: string, sessionId: string) {
    super();
    this.question.question = question;
    this.sessionId = sessionId;
  }
}

export class Player extends Schema {
  @type("string") username: string;
  @type("string") sessionId: string;
  @type("boolean") isHost: boolean;
  @type([AnsweredQuestions]) answeredQuestions: AnsweredQuestions[] = [];

  constructor(username: string, sessionId: string, isHost: boolean) {
    super();
    this.username = username;
    this.sessionId = sessionId;
    this.isHost = isHost;
    this.answeredQuestions = [];
  }

  toObject() {
    return {
      username: this.username,
      sessionId: this.sessionId,
      isHost: this.isHost
    }
  }
}

export class GameState extends Schema {
  @type([Question]) questions: (Question)[] = new ArraySchema<Question>();
  @type("string") category: string;
  @type("number") score: number = 0;
  @type("string") gameStatus: GameStatus = "idle";
  @type("boolean") gameStarted: boolean = false;
  @type("number") round: number = 1;
  @type("number") totalRounds: number = 0;
}

export class GameClasses extends Schema {
  @type("string") gameRoomName: string;
  @type([Player]) players: (Player)[] = new ArraySchema<Player>();
  @type(GameState) gameState: GameState = new GameState();
  @type(Player) host: Player;
}
