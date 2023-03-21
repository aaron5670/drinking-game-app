import {Room, Client, updateLobby} from "colyseus";
import {MyRoomState} from "./schema/MyRoomState";
import {OnJoinCommand} from "../commands/OnJoinCommand";
import {Dispatcher} from "@colyseus/command";
import {OnLeaveCommand} from "../commands/OnLeaveCommand";

interface MyRoomOptions {
  roomName: string;
}

interface JoinOptions {
  username: string;
}

export class MyRoom extends Room<MyRoomState> {
  private givenRoomName: string;
  private dispatcher = new Dispatcher(this);

  onCreate(options: MyRoomOptions) {
    this.setState(new MyRoomState());
    this.maxClients = 3;
    this.givenRoomName = options.roomName;

    this.setMetadata({
      givenRoomName: this.givenRoomName
    }).then(() => updateLobby(this))

    this.onMessage("startGame", (client, message) => {
      const player = this.state.players.find(player => player.sessionId === client.sessionId);
      if (player.isHost) {

        this.setPrivate(true)
          .then(() => this.broadcast("startGame", "Game is starting..."))
        console.log('Host is starting the game...')
      }
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
