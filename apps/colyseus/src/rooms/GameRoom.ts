import {Room, Client, updateLobby} from "colyseus";
import {RoomState} from "@game/colyseus-schema";
import {Dispatcher} from "@colyseus/command";
import {OnJoinCommand} from "../commands/OnJoinCommand";
import {OnLeaveCommand} from "../commands/OnLeaveCommand";
import {OnGameStartCommand} from "../commands/OnGameStartCommand";

interface MyRoomOptions {
  gameRoomName: string;
}

interface JoinOptions {
  username: string;
}

export class GameRoom extends Room<RoomState> {
  private dispatcher = new Dispatcher(this);
  private gameRoomName: string;

  onCreate(options: MyRoomOptions) {
    this.setState(new RoomState());
    this.maxClients = 3;

    // set gameRoomName
    this.state.gameRoomName = options.gameRoomName;

    // set metadata (for lobby)
    this.setMetadata({
      gameRoomName: options.gameRoomName
    }).then(() => updateLobby(this))

    this.onMessage("startGame", (client) => {
      this.dispatcher.dispatch(new OnGameStartCommand(), {
        client
      });
    });
  }

  onJoin(client: Client, options: JoinOptions) {
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
