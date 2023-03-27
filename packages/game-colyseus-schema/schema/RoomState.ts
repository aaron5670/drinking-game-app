import {Schema, ArraySchema, type} from "@colyseus/schema";
import {Player} from "@game/colyseus-schema";

export type GameStatus = "idle" | "generatingQuestions" | "ready";

export class Question extends Schema {
  @type("string") question: string;
}

export class GameState extends Schema {
  @type(Player) currentPlayer: Player;
  @type([Question]) questions: (Question)[] = new ArraySchema<Question>();
  @type("number") score: number = 0;
  @type("string") gameStatus: GameStatus = "idle";
  @type("boolean") gameStarted: boolean = false;
}

export class RoomState extends Schema {
  @type("string") gameRoomName: string;
  @type([Player]) players: (Player)[] = new ArraySchema<Player>();
  @type(GameState) gameState: GameState = new GameState();
  @type(Player) host: Player;
}
