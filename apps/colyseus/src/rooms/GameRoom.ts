import {Room, Client, updateLobby} from "colyseus";
import {RoomState} from "@game/colyseus-schema";
import {Dispatcher} from "@colyseus/command";
import {OnJoinCommand} from "../commands/OnJoinCommand";
import {OnLeaveCommand} from "../commands/OnLeaveCommand";
import {OnGameStartCommand} from "../commands/OnGameStartCommand";
import {OnGenerateQuestionsCommand} from "../commands/OnGenerateQuestionsCommand";

interface MyRoomOptions {
  gameRoomName: string;
  username: string;
}

interface JoinOptions {
  username: string;
}

export class GameRoom extends Room<RoomState> {
  private dispatcher = new Dispatcher(this);

  onCreate(options: MyRoomOptions) {
    this.setState(new RoomState());
    this.maxClients = 8;

    // set gameRoomName
    this.state.gameRoomName = options.gameRoomName;

    // set metadata (for lobby)
    this.setMetadata({
      gameRoomName: options.gameRoomName
    }).then(() => updateLobby(this))

    this.onMessage("startGame", (client) => {
      this.dispatcher.dispatch(new OnGameStartCommand(), { client });
      this.dispatcher.dispatch(new OnGenerateQuestionsCommand());
    });
  }

  onJoin(client: Client, options: JoinOptions) {
    console.log("client joined!", options.username);
    this.dispatcher.dispatch(new OnJoinCommand(), {
      username: options.username,
      sessionId: client.sessionId,
      isHost: this.state.players.length === 0
    });

    console.log(client.sessionId, "joined!");
    console.log(`total players: ${this.clients.length}`);
  }

  onLeave(client: Client, consented: boolean) {
    // Send leave message to all clients
    this.dispatcher.dispatch(new OnLeaveCommand(), {
      sessionId: client.sessionId
    });

    console.log(client.sessionId, "left!");
    console.log(`total players: ${this.clients.length}`);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
    this.dispatcher.stop();
  }
}
