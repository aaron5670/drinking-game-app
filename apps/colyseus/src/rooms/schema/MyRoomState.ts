import {Schema, ArraySchema, type} from "@colyseus/schema";
import {Player} from "colyseus-schema";

export class MyRoomState extends Schema {
  @type("string") roomName: string;
  @type([Player]) players: (Player | any)[] = new ArraySchema<Player>();
  @type("boolean") gameStarted: boolean = false;
}
