import {Schema, ArraySchema, type} from "@colyseus/schema";
import {Player} from "@game/colyseus-schema";

class GameState extends Schema {
  @type(Player) currentPlayer: Player;
  @type("number") score: number = 0;
}

export class RoomState extends Schema {
  @type("string") gameRoomName: string;
  @type([Player]) players: (Player)[] = new ArraySchema<Player>();
  @type(GameState) gameState: GameState = new GameState();
  @type(Player) host: Player;
  @type("boolean") gameStarted: boolean = false;
}
