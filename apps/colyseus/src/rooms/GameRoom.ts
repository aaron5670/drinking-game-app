import {Room, Client, updateLobby} from "colyseus";
import {GameClasses} from "@game/colyseus-schema";
import {Dispatcher} from "@colyseus/command";
import {OnJoinCommand} from "../commands/OnJoinCommand";
import {OnLeaveCommand} from "../commands/OnLeaveCommand";
import {OnGameStartCommand} from "../commands/OnGameStartCommand";
import {OnGenerateQuestionsCommand} from "../commands/OnGenerateQuestionsCommand";
import { OnQuestionAnsweredCommand } from "../commands/OnQuestionAnsweredCommand";

interface MyRoomOptions {
  gameRoomName: string;
  category: string;
}

interface JoinOptions {
  username: string;
}

interface AnswerOptions {
  sessionId: string;
}

export class GameRoom extends Room<GameClasses> {
  private dispatcher = new Dispatcher(this);

  onCreate(options: MyRoomOptions) {
    this.setState(new GameClasses());
    this.maxClients = 8;

    // set gameRoomName
    this.state.gameRoomName = options.gameRoomName;
    this.state.gameState.category = options.category.length > 0 ? options.category : null;

    // set metadata (for lobby)
    this.setMetadata({
      gameRoomName: options.gameRoomName,
      category: options.category,
    }).then(() => updateLobby(this))

    this.onMessage("startGame", (client) => {
      this.dispatcher.dispatch(new OnGameStartCommand(), { client });
      this.dispatcher.dispatch(new OnGenerateQuestionsCommand());
    });

    this.onMessage("answer", (client, message: AnswerOptions) => {
      this.dispatcher.dispatch(new OnQuestionAnsweredCommand(), { client, sessionId: message.sessionId });
    });
  }

  onJoin(client: Client, options: JoinOptions) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
      username: options.username,
      sessionId: client.sessionId,
      isHost: this.state.players.length === 0
    });
    console.log("client joined!", options.username);
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
