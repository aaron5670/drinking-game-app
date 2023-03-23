import {Schema, type} from "@colyseus/schema";

export class Player extends Schema {
  @type("string") username: string;
  @type("string") sessionId: string;
  @type("boolean") isHost: boolean;

  constructor(username: string, sessionId: string, isHost: boolean) {
    super();
    this.username = username;
    this.sessionId = sessionId;
    this.isHost = isHost;
  }

  toObject() {
    return {
      username: this.username,
      sessionId: this.sessionId,
      isHost: this.isHost
    }
  }
}
