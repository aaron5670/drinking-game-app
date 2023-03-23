import {Schema, ArraySchema, type} from "@colyseus/schema";
import {Player} from "@game/colyseus-schema";

export class RoomState extends Schema {
  @type("string") roomName: string;
  @type([Player]) players: (Player | any)[] = new ArraySchema<Player>();
  @type("boolean") gameStarted: boolean = false;
}
